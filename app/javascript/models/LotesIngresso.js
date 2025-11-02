const Sequelize = require('sequelize');
const db = require('../db/connection');
const Evento = require('./Evento')
    /*Criando o objeto que é vinculado a tabela Eventos no banco de dados 
    junto com suas colunas e configurações, caso tenha alguma alteração na 
    tabela no banco é necessário alterar as configurações desse objeto*/

const LotesIngressos = db.define('LotesIngressos', {
    lotesIngressosID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
    },
    preco: {
        type: Sequelize.INTEGER,
    },
    eventoID: {
        type: Sequelize.INTEGER,
        references: {
            model: Evento,
            key: 'eventoID'
        }
    },
    ativo: {
        type: Sequelize.INTEGER,
    },
}, {
    tableName: 'LotesIngressos'
}, );
// Defina a relação entre Cidade e Estado
Evento.belongsTo(Evento, { foreignKey: 'eventoID' });

//Exportando para que seja utilizado em outros arquivos
module.exports = LotesIngressos;