//BackEnd
const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');
const { checkToken, getUsuario } = require('../public/checkToken');
const { salvarPedido } = require('../utils/pedidos');

mercadopago.configure({
  access_token: 'TEST-7396307821270530-050719-15f333e32b996b4eb5ea5033bd99295b-287536635',
});

router.post('/process_payment',checkToken, async (req, res) => {
  try {
    const usuario = getUsuario(req);
    const usuarioID = usuario?.id;
    const {
      token,
      issuer_id,
      payment_method_id,
      transaction_amount,
      installments,
      payer,
    } = req.body;

    const paymentData = {
      transaction_amount: Number(transaction_amount),
      description: 'Pagamento via Checkout Bricks',
      payment_method_id,
      payer: {
        email: payer.email,
        identification: {
        type: payer.identification?.type || "CPF",
        number: payer.identification?.number || "442.827.398-35",
        },
      },
      metadata: {
        usuarioId: usuarioID, // enviado para webhook
      },
    };
    // Só adiciona token, issuer e installments se não for Pix
    if (payment_method_id !== 'pix') {
      paymentData.token = token;
      paymentData.issuer_id = issuer_id;
      paymentData.installments = Number(installments) || 1;
    }

    const result = await mercadopago.payment.create(paymentData);
    const payment = result.body;

    const response = {
      id: payment.id,
      status: payment.status,
      status_detail: payment.status_detail,
    };

    // Se for Pix, adiciona dados do QRCode
    if (payment_method_id === 'pix' && payment.point_of_interaction) {
      response.qr_code_base64 = payment.point_of_interaction.transaction_data.qr_code_base64;
      response.qr_code = payment.point_of_interaction.transaction_data.qr_code;
    }
    await salvarPedido(payment)

    return res.status(200).json(response);
  } catch (error) {
    console.error('Erro ao processar pagamento:', error.response?.data || error);
    return res.status(500).json({
      error: 'Erro interno no servidor',
      details: error.message,
    });
  }
});

module.exports = router;
