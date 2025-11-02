const Sequelize = require('sequelize');
const db = require('../db/connection');
const Estado = require('./Estado');

const Cidade = db.define('Cidade', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING(50), // Defina o tamanho conforme necessário
        allowNull: true // Permitir NULL, conforme sua estrutura
    },
    uf: {
        type: Sequelize.STRING(50), // Chave estrangeira para o ID do Estado
        allowNull: true,
        references: {
            model: Estado,
            key: 'id'
        }
    },
    ibge: {
        type: Sequelize.STRING(50),
        allowNull: true // Permitir NULL, conforme sua estrutura
    },
    uf_nome: {
    type: Sequelize.STRING(50),
    allowNull: true // Permitir NULL, conforme sua estrutura
    },
    estado_id: {
    type: Sequelize.STRING(50),
    allowNull: true // Permitir NULL, conforme sua estrutura
},
    tableName: 'Cidade'
}, );
// Defina a relação entre Cidade e Estado
Cidade.belongsTo(Estado, { foreignKey: 'estado_id' });

module.exports = Cidade;