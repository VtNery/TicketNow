/*Configuração de uma rota para que seja encontrado o modelo do Evento e posteriormente 
utilizando o express.router para gerar um insert ao banco*/

const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

//add usuario via post usando a rota /add
router.post('/add', (req, res) => {
    //Declarando quais são as minhas colunas dentro da minha tabela
    let { nome, CPF, email, senha } = req.body;

    // insert
    Usuario.create({
            nome,
            CPF,
            email,
            senha,
        })
        //Caso sucesso redireciona a pagina inicial
        .then(() => res.redirect('/'))
        //Caso falhe mostra o erro
        .catch(err => console.log(err));

});

router.get('/usuariosconfirmacacao', (req, res) => {
    res.send('Usuario Inserido com Sucesso');
});
//exportando para que seja utilizado em outro documento
module.exports = router