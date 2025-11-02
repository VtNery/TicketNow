const Pedido = require('../models/Pedidos');

async function salvarPedido(payment) {
    const usuarioID =
    payment.metadata?.usuarioId ||
    payment.metadata?.usuario_ID ||
    payment.metadata?.usuario_id ||
    null;
  console.log('Salvando pedido para usuário:', usuarioID);

  let statusPedido;
  switch (payment.status) {
    case 'approved':
      statusPedido = 1;
      break;
    case 'pending':
      statusPedido = 0;
      break;
    case 'rejected':
      statusPedido = 2;
      break;
    default:
      statusPedido = 0;
  }

  const metodoPagamento = payment.payment_type_id === 'credit_card' ? 1 : 2;

  const taxa = payment.transaction_details?.net_received_amount
    ? Number(payment.transaction_amount) - Number(payment.transaction_details.net_received_amount)
    : 0;

  // Atualiza se já existir ou cria novo pedido
  let pedidoExistente = await Pedido.findOne({ where: { pagamentoID: payment.id } });
  if (pedidoExistente) {
    await pedidoExistente.update({
      usuarioID,
      statusPedido,
      valor: payment.transaction_amount,
      taxa,
      metodoPagamento,
      bandeira: payment.payment_method_id,
      parcelas: payment.installments || 1,
      updatedAt: new Date(),
    });
  } else {
    await Pedido.create({
      usuarioID,
      pagamentoID: payment.id,
      statusPedido,
      valor: payment.transaction_amount,
      taxa,
      metodoPagamento,
      bandeira: payment.payment_method_id,
      parcelas: payment.installments || 1,
      updatedAt: new Date(),
    });
  }
}

module.exports = { salvarPedido };