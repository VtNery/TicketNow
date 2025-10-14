const express = require('express');
const router = express.Router();
const { checkToken, getUsuario } = require('../public/checkToken');


router.get('/',checkToken, (req, res) => {
    const usuario = getUsuario(req);
    res.render('ajuda',{
        usuario
    })
});

module.exports = router