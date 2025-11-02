/*Configuração de uma rota para que seja encontrado o modelo do Evento e posteriormente 
utilizando o express.router para gerar um insert ao banco*/
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Op = Sequelize.Op;

router.get('/',  (req, res) => {
    res.render('registrar')
});

router.post('/', async(req, res) => {
    //Declarando quais são as minhas colunas dentro da minha tabela
    const { nome, CPF, email, senha, datanascimento } = req.body;

    try{
        const usuario = await Usuario.findOne({                    
            where: {CPF:{[Op.like]: CPF}},
            });

            if(usuario){
                res.render('registrar',{
                    usuario
                })
            }else{
                //Encriptar Senha
                const salt = await bcrypt.genSalt(12)
                const passwordHash = await bcrypt.hash(senha, salt)
                //Criar Usuario
                Usuario.create({
                    nome,
                    CPF,
                    email,
                    senha : passwordHash,
                    datanascimento
                })
                //Caso sucesso redireciona a pagina inicial
                .then(() => res.redirect('/registroConfirmacao'))
                //Caso falhe mostra o erro
                .catch(err => console.log(err));
            }
    }catch(error){
        console.log(error)
    }

    // insert
});

module.exports = router



