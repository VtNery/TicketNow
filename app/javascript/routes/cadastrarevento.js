const express = require('express');
const router = express.Router();
const Evento = require('../models/Evento'); // Caminho para o modelo Evento
const { checkToken, getUsuario } = require('../public/checkToken'); // Considere mover checkToken para fora de 'public'

// Rota GET para exibir o formulário de cadastro de evento
// Acessada via: /cadastrarevento
router.get('/', checkToken, (req, res) => {
    const usuario = getUsuario(req); // Obtém dados do usuário do token
    res.render('cadastrarevento', { // Renderiza o template Handlebars 'cadastrarevento.handlebars'
        usuario
    });
});

// Rota POST para processar o envio do formulário de cadastro de evento
// Acessada via: POST para /cadastrarevento
router.post('/', checkToken, async (req, res) => {
    try {
        // req.body contém os dados enviados pelo formulário (graças ao bodyParser.json() no app.js)
        const { titulo, endereco, eventotipo, descricao, estado, cidade, data, cor1, cor2, lote1, lote2, lote3, lote4, lote5, lote6, lote7, lote8, lote9, lote10 } = req.body;

        // Obtenha o ID do criador do evento.
        const usuario = getUsuario(req); 
        if (!usuario || !usuario.id) {
            return res.status(401).json({ message: 'Usuário não autenticado para criar evento.' });
        }
        const criadoreventoId = usuario.id; // ID do usuário que criou o evento

        // Validação básica dos campos obrigatórios
        if (!titulo || !eventotipo || !estado || !cidade) {
            return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
        }

        // Insere os dados no banco de dados usando seu modelo Evento
        await Evento.create({
            titulo: titulo,
            endereco: endereco,
            eventotipo: eventotipo,
            descricao: descricao,
            estado: estado,
            cidade: cidade,
            data: data,
            cor1: cor1,
            cor2: cor2, 
            criadorevento: criadoreventoId, 
            lote1: lote1,
            lote2: lote2,
            lote3: lote3,
            lote4: lote4,
            lote5: lote5,
            lote6: lote6,
            lote7: lote7,
            lote8: lote8,
            lote9: lote9,
            lote10: lote10,

        });

        // Envia uma resposta de sucesso para o frontend
        res.status(201).json({ message: 'Evento cadastrado com sucesso!' });

    } catch (error) {
        console.error('Erro ao cadastrar evento:', error);
        // Envia uma resposta de erro para o frontend
        res.status(500).json({ message: 'Erro interno do servidor ao cadastrar evento.', error: error.message });
    }
});

module.exports = router;
