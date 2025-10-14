const Sequelize = require('sequelize');

// Configurações de conexão
const sequelize = new Sequelize('TicketNow', 'administrador', '123456tn*', {
    dialect: 'mssql',
    host: 'ticketnow2024.database.windows.net',
    dialectOptions: {
        options: {
            encrypt: true, // Necessário para conexões com Azure
        },
    },
});

module.exports = sequelize;