const Sequelize = require('sequelize');
const db = require('../db/connection');

const Estado = db.define('Estado', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    uf: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    ibge: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    pais: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    ddd: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
}, {
    tableName: 'Estado',
    timestamps: false
});

module.exports = Estado;