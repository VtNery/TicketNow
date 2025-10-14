const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');

// Configurar Mercado Pago
mercadopago.configure({
  access_token: 'TEST-7396307821270530-050719-15f333e32b996b4eb5ea5033bd99295b-287536635',
});

// Rota única para todos os métodos de pagamento
router.post('/process_payment', async (req, res) => {
  try {
    const {
      token,
      issuer_id,
      payment_method_id,
      transaction_amount,
      installments,
      payer
    } = req.body;

    if (!payment_method_id || !transaction_amount || !payer?.email || !payer?.identification?.number) {
      return res.status(400).json({ status: 'error', message: 'Dados insuficientes para processar o pagamento.' });
    }

    const paymentData = {
      transaction_amount: Number(transaction_amount),
      payment_method_id,
      description: 'Compra via Checkout Bricks',
      payer: {
        email: payer.email,
        first_name: payer.first_name || 'Cliente',
        last_name: payer.last_name || 'Exemplo',
        identification: {
          type: payer.identification.type || 'CPF',
          number: payer.identification.number,
        },
      },
    };

    // Adiciona dados específicos para cartão de crédito
    if (token && installments && issuer_id) {
      paymentData.token = token;
      paymentData.installments = Number(installments);
      paymentData.issuer_id = issuer_id;
    }    

    const response = await mercadopago.payment.create(paymentData);
    const { status, status_detail, id, point_of_interaction } = response.body;

    // Se for Pix, incluir QR Code na resposta
    if (payment_method_id === 'pix' && point_of_interaction?.transaction_data) {
      return res.json({
        status,
        status_detail,
        id,
        qr_code: point_of_interaction.transaction_data.qr_code,
        qr_base64: point_of_interaction.transaction_data.qr_code_base64,
      });
    }

    return res.json({ status, status_detail, id });

  } catch (error) {
    console.error('Erro ao processar pagamento:', error.response?.data || error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Erro ao processar pagamento',
    });
  }
});

module.exports = router;
