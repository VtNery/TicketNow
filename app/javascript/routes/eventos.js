const express = require('express');
const router = express.Router();
const Eventos = require('../models/Evento');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { checkToken, getUsuario } = require('../public/checkToken');


router.get('/',checkToken, async(req, res) => {
    const usuario = getUsuario(req);

    let searchCidade = req.query.seletorCidade;

    let query = '%' + searchCidade + '%'

    if (!searchCidade) {
        try {
            const evento = await Eventos.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            const cidade = await Eventos.findAll({
                attributes: ['cidade', 'estado'], // Seleciona apenas a coluna 'cidade e estado'
                group: ['cidade', 'estado'], // Agrupa pelos valores da coluna 'cidade e estado'
            })
            res.render('eventos', {
                evento,
                cidade,
                usuario
            });
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            const evento = await Eventos.findAll({
                where: {
                    cidade: {
                        [Op.like]: query
                    }
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            const cidade = await Eventos.findAll({
                attributes: ['cidade', 'estado'], // Seleciona apenas a coluna 'cidade e estado'
                group: ['cidade', 'estado'], // Agrupa pelos valores da coluna 'cidade e estado'
            })
            res.render('eventos', {
                evento,
                cidade,
                usuario
            });
            
        } catch (error) {
            console.log(error)
        }
    }
})




//add usuario via post usando a rota /add
router.post('/add', (req, res) => {
    //Declarando quais são as minhas colunas dentro da minha tabela
    let { titulo, link, classificacaoetaria, estado, cidade, data, local, termoCondicoes, descricao } = req.body;

    // insert ao banco
    Eventos.create({
            titulo,
            empresa: 1,
            eventoTipo: 1,
            link,
            classificacaoetaria,
            estado,
            cidade,
            data,
            local,
            termoCondicoes,
            descricao
        })
        //Caso sucesso redireciona a pagina inicial
        .then(() => res.redirect('/'))
        //Caso falhe mostra o erro
        .catch(err => console.log(err));

});
//exportando para que seja utilizado em outro documento
module.exports = router