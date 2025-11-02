const Sequelize = require('sequelize');
const db = require('../db/connection');
const Usuario = require('./Usuario');
const Evento = require('./Evento');

const Compras = db.define('Compras', {
    compraID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    usuarioID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'Usuario',
            key: 'usuarioid'
        }
    },
    eventoID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'Evento', // Assumindo que o modelo de eventos é chamado 'Eventos'
            key: 'eventoID'
        }
    },
    dataCompra: {
        type: Sequelize.DATE,
        allowNull: true
    },
    quantidadeCompra: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    tipoIngresso: {
        type: Sequelize.STRING,
        allowNull: true
    },
    preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
    },
    statusCompra: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    metodoPagamento: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    cupomDesconto: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    codigoTransacao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    valorDesconto: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    dataReembolso: {
        type: Sequelize.DATE,
        allowNull: true
    },
    valorReembolso: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
    },
    statusReembolso: {
        type: Sequelize.STRING,
        allowNull: true
    },
    motivoReembolso: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    tableName: 'Compras'
});

// Definindo as relações entre Compras, Usuario e Eventos
Compras.belongsTo(Usuario, { foreignKey: 'usuarioID' });
Compras.belongsTo(Evento, { foreignKey: 'eventoID' });

module.exports = Compras;;