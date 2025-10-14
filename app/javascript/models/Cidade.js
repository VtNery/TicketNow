const Sequelize = require('sequelize');
const db = require('../db/connection');
const Estado = require('./Estado');

const Cidade = db.define('Cidade', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING(120), // Defina o tamanho conforme necessário
        allowNull: true // Permitir NULL, conforme sua estrutura
    },
    uf: {
        type: Sequelize.INTEGER, // Chave estrangeira para o ID do Estado
        allowNull: true,
        references: {
            model: Estado,
            key: 'id'
        }
    },
    ibge: {
        type: Sequelize.INTEGER,
        allowNull: true // Permitir NULL, conforme sua estrutura
    }
}, {
    tableName: 'Cidade'
}, );
// Defina a relação entre Cidade e Estado
Cidade.belongsTo(Estado, { foreignKey: 'uf' });

module.exports = Cidade;