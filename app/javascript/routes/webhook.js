const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');
const { salvarPedido } = require('../utils/pedidos');

mercadopago.configure({
  access_token: 'TEST-7396307821270530-050719-15f333e32b996b4eb5ea5033bd99295b-287536635',
});

router.post('/', async (req, res) => {

  try {
    const { type, data } = req.body;  


    // Responde rapidamente ao Mercado Pago
    res.sendStatus(200);

    if (type === 'payment') {
      const paymentId = data.id;
      const result = await mercadopago.payment.findById(paymentId);
      const payment = result.body;
      console.log(`Webhook recebido: pagamento ${payment.id} com status ${payment.status}`);

      // Salva ou atualiza o pedido
      await salvarPedido(payment);
    }
  } catch (err) {
    console.error("Erro no webhook:", err);
  }
});

module.exports = router;