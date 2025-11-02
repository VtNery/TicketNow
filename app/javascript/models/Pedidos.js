const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Pedido = db.define('Pedido', {
  pedidoID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuarioID: {
    type: DataTypes.INTEGER,
    allowNull: true, // pode ser null caso não tenha usuário logado
  },
  pagamentoID: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true, // garante que não tenha duplicado
  },
  statusPedido: {
    type: DataTypes.INTEGER, // 0=aguardando, 1=aprovado, 2=rejeitado
    allowNull: false,
    defaultValue: 0,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  taxa: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  metodoPagamento: {
    type: DataTypes.INTEGER, // 1=cartão, 2=pix, 3=outros
  },
  bandeira: {
    type: DataTypes.STRING,
  },
  parcelas: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  tableName: 'Pedidos',
  timestamps: true, // já cria createdAt e updatedAt automaticamente
});

module.exports = Pedido;