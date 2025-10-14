const mp = new MercadoPago('TEST-bc642c78-7454-410c-af2d-2cdc3f6a0c72', {
  locale: 'pt-BR',
});

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

    onChange: (event) => {
      const selected = event?.selectedPaymentMethod?.payment_method_id;
      const cpfInputDiv = document.getElementById("cpf-input");

      if (selected === "pix") {
        cpfInputDiv.classList.remove("hidden");
      } else {
        cpfInputDiv.classList.add("hidden");
      }
    },

onSubmit: async ({ selectedPaymentMethod, formData }) => {
  console.log("selectedPaymentMethod:", selectedPaymentMethod); // Debug

  const cpf = document.getElementById("cpf").value;

  // Adiciona os campos manualmente
  formData.payment_method_id = selectedPaymentMethod?.payment_method_id;
  formData.payment_type_id = selectedPaymentMethod?.payment_type_id;
  formData.transaction_amount = total;

  // Adiciona CPF se for Pix
  if (selectedPaymentMethod?.payment_method_id === "pix") {
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
      document.getElementById("pix-img").src = `data:image/png;base64,${result.qr_base64}`;
      document.getElementById("pix-info").classList.remove("hidden");
    } else {
      alert("Pagamento pendente ou recusado: " + result.status_detail);
    }

  } catch (error) {
    console.error("Erro ao processar pagamento:", error);
    alert("Erro ao processar pagamento.");
  }
},

    onError: (error) => {
      console.error("Erro no Payment Brick:", error);
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
