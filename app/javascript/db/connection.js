const Sequelize = require('sequelize');

// Configurações de conexão
const sequelize = new Sequelize('TicketNow', 'administrador', '123456Tn', {
  dialect: 'mssql',
  host: 'localhost',
  port: 1500,           // porta TCP que você configurou
  dialectOptions: {
    options: {
      encrypt: false,           // use true se for Azure ou conexão criptografada
      trustServerCertificate: true, // útil em ambiente local para ignorar certificado
    },
  },
});

module.exports = sequelize;