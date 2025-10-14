const express = require('express');
const router = express.Router();
const Eventos = require('../models/Evento');
const LotesIngressos = require('../models/LotesIngresso');
const { checkToken, getUsuario } = require('../public/checkToken');

router.get('/:titulo/:eventoID',checkToken, async(req, res) => {
    const usuario = getUsuario(req);
    const eventoID = req.params.eventoID;
    const evento = await Eventos.findAll({
        where: {
            eventoID : eventoID
        },
        order: [
            ['createdAt', 'DESC']
        ]
    });
    const LotesIngresso = await LotesIngressos.findAll({
        where: {
            eventoID : eventoID,
            ativo : 1
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
        if (!evento) {
            return res.status(404).send('Evento não encontrado');
        }else{
            res.render('paginaEvento',{
                evento,
                LotesIngresso,         
                usuario})
            }
        });

module.exports = router;