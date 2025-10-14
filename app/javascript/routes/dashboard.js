const express = require('express');
const router = express.Router();
const Evento = require('../models/Evento');
const { checkToken, getUsuario } = require('../public/checkToken');

// Rota GET para o Dashboard
router.get('/', checkToken, async (req, res) => {
    const usuario = getUsuario(req);

    if (!usuario || !usuario.id) {
        console.log('DEBUG: Usuário não autenticado ou ID ausente. Redirecionando para login.');
        return res.redirect('/login');
    }

    const criadoreventoId = usuario.id;
    console.log('DEBUG: ID do usuário logado (criadoreventoId):', criadoreventoId);

    try {
        const eventosDoUsuario = await Evento.findAll({
            where: {
                criadorevento: criadoreventoId
            },
            order: [
                ['createdAt', 'DESC']
            ],
            raw: true,
            attributes: [
                'titulo',
                'descricao',
                'estado',
                'cidade',
                'data',
            ]
        });

        const eventosFormatados = eventosDoUsuario.map(e => ({
            ...e,
            dataformatada: new Date(e.data).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        }));

        console.log('DEBUG: Quantidade de eventos encontrados para o usuário:', eventosFormatados.length);

        res.render('dashboard', {
            usuario,
            eventos: eventosFormatados,
            hasEvents: eventosFormatados.length > 0
        });

    } catch (error) {
        console.error('ERRO: Ocorreu um erro ao buscar eventos do usuário no dashboard:', error);
        res.status(500).render('dashboard', {
            usuario,
            eventos: [],
            hasEvents: false,
            error: 'Não foi possível carregar seus eventos.'
        });
    }
});

module.exports = router;
