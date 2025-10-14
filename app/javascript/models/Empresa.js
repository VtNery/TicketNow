const Sequelize = require('sequelize');
const db = require('../db/connection');
const sequelize = require('../db/connection');

/*Criando o objeto que é vinculado a tabela Empresas no banco de dados 
junto com suas colunas e configurações, caso tenha alguma alteração na 
tabela no banco é necessário alterar as configurações desse objeto*/

const Empresa = db.define('empresa', {
    empresaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeEmpresa: {
        type: Sequelize.STRING,
    },
    tipoEmpresa: {
        type: Sequelize.INTEGER,
    },
    quantidadeEventos: {
        type: Sequelize.INTEGER,
    },
    usuarioID: {
        type: Sequelize.INTEGER,
    },
    emailEmpresa: {
        type: Sequelize.STRING,
    },
    telefoneEmpresa: {
        type: Sequelize.STRING,
    },
    siteEmpresa: {
        type: Sequelize.STRING,
    },
    entrarContato: {
        type: Sequelize.BOOLEAN,
    },
    observacoes: {
        type: Sequelize.STRING,
    },
}, {
    tableName: 'Empresas'
}, );

//Exportando para que seja utilizado em outros arquivos
module.exports = Empresa;