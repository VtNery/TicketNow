const express = require('express');
const router = express.Router();
const { checkToken, getUsuario } = require('../public/checkToken');

router.get('/',checkToken, async(req, res) => {
    const usuario = getUsuario(req);

    
            res.render('dadosBancarios',{       
                usuario,
                })
            }
        );

module.exports = router;