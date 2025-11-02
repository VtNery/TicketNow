//Front-end
const mp = new MercadoPago('TEST-bc642c78-7454-410c-af2d-2cdc3f6a0c72', {
  locale: 'pt-BR',
});

let usuario = null;

async function carregarUsuario() {
  try {
    const res = await fetch('/dadosBancarios/api/usuario', {
      credentials: 'include' // necessário para enviar cookies
    });

    if (!res.ok) {
      throw new Error('Erro ao buscar dados do usuário');
    }

    usuario = await res.json();
  } catch (err) {
    console.error(err);
    alert("Não foi possível carregar os dados do usuário.");
  }
}

const total = parseFloat(localStorage.getItem("totalIngresso") || "0");
const bricksBuilder = mp.bricks();

bricksBuilder.create("payment", "form-checkout", {
  initialization: {
    amount: total,
    payer: {
      email: "cliente@email.com"
    },
  },
  customization: {
    paymentMethods: {
      ticket: "all",         // Pix e boleto desativado aqui
      credit_card: "all",
      bank_transfer: "all"
    },
  },
  callbacks: {
    onReady: () => {
      console.log("Payment Brick carregado");
    },

    onChange: async (event) => {
      const selected = event?.formdata.payment_method_id;
      const cpfInputDiv = document.getElementById("cpf-input");

      if (selected === "pix") {
        cpfInputDiv.classList.remove("hidden");
      } else {
        cpfInputDiv.classList.add("hidden");
      }
    },

onSubmit: async ({formData }) => {
  console.log("formdata:", formData); // Debug

  await carregarUsuario();

 const cpf = usuario?.cpf || "";


  // Adiciona CPF se for Pix
  if (formData.payment_method_id === "pix") {
    if (!cpf || cpf.length < 11) {
    alert("Por favor, insira um CPF válido.");
    return;}
    formData.payer = {
      ...formData.payer,
      identification: {
        type: "CPF",
        number: cpf
      }
    };
  }

  // Envio do pagamento
  try {
    const response = await fetch("/pagamento/process_payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log("Resultado do pagamento:", result);

    if (result.status === "approved") {
      alert("Pagamento aprovado!");
    } else if (formData.payment_method_id === "pix") {
      document.getElementById("pix-code").innerText = result.qr_code;
      document.getElementById("pix-img").src = `data:image/png;base64,${result.qr_code_base64}`;
      document.getElementById("pix-info").classList.remove("hidden");
    } else {
      alert("Pagamento pendente ou recusado: " + result.status_detail);
    }

  } catch (error) {
    console.error("Erro ao processar pagamento:", error);
    console.log(error)
    alert("Erro ao processar pagamento.");
  }
},

    onError: (error) => {
      console.error("Erro no Payment Brick:", error.response?.data|| error.message|| error);
        return res.status(500).json({
    status: 'error',
    message: 'Erro ao processar pagamento',
    details: error.response?.data || error.message || error,
        })
    },
  },
});

// Função para copiar código Pix
function copiarPix() {
  const code = document.getElementById('pix-code').innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert('Código Pix copiado!');
  });
}
