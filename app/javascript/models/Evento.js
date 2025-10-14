const Sequelize = require('sequelize');
const db = require('../db/connection');
const Usuario = require('./Usuario')
    /*Criando o objeto que é vinculado a tabela Eventos no banco de dados 
    junto com suas colunas e configurações, caso tenha alguma alteração na 
    tabela no banco é necessário alterar as configurações desse objeto*/

const Evento = db.define('evento', {
    eventoID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    criadorevento: {
        type: Sequelize.INTEGER,
        references: {
            model: Usuario,
            key: 'usuarioid'
        }
    },
    titulo: {
        type: Sequelize.STRING,
    },
    empresa: {
        type: Sequelize.INTEGER,
    },
    eventoTipo: {
        type: Sequelize.INTEGER,
    },
    link: {
        type: Sequelize.STRING,
    },
    classificacaoetaria: {
        type: Sequelize.INTEGER,
    },
    estado: {
        type: Sequelize.STRING,
    },
    cidade: {
        type: Sequelize.STRING,
    },
    data: {
        type: Sequelize.STRING,
    },
    termosCondicoes: {
        type: Sequelize.STRING,
    },
    descricao: {
        type: Sequelize.STRING,
    },
}, {
    tableName: 'Eventos'
}, );
// Defina a relação entre Cidade e Estado
Usuario.belongsTo(Usuario, { foreignKey: 'usuarioid' });

//Exportando para que seja utilizado em outros arquivos
module.exports = Evento;