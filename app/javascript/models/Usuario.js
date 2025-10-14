const Sequelize = require('sequelize');
const db = require('../db/connection');

/*Criando o objeto que é vinculado a tabela Usuarios no banco de dados 
junto com suas colunas e configurações, caso tenha alguma alteração na 
tabela no banco é necessário alterar as configurações desse objeto*/

const Usuario = db.define('usuario', {
    usuarioid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
    },
    CPF: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    senha: {
        type: Sequelize.STRING,
    },
    datanascimento: {
        type: Sequelize.STRING,
    },
    administrador: {
        type: Sequelize.INTEGER,
    }
}, {
    tableName: 'Usuarios'
}, {

});

//Exportando para que seja utilizado em outros arquivos
module.exports = Usuario;