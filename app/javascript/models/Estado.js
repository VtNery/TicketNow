const Sequelize = require('sequelize');
const db = require('../db/connection');

const Estado = db.define('Estado', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING(75),
        allowNull: true
    },
    uf: {
        type: Sequelize.STRING(2),
        allowNull: true
    },
    ibge: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    pais: {
        type: Sequelize.INTEGER,
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