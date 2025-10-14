/*Configuração de uma rota para que seja encontrado o modelo do Evento e posteriormente 
utilizando o express.router para gerar um insert ao banco*/

const express = require('express');
const router = express.Router();

router.get('/',  (req, res) => {
    res.render('registroConfirmacao')
});

module.exports = router



