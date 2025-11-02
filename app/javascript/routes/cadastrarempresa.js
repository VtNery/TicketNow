/*Configuração de uma rota para que seja encontrado o modelo do Evento e posteriormente 
utilizando o express.router para gerar um insert ao banco*/
const express = require('express');
const router = express.Router();
const Empresas = require('../models/Empresa');
const Sequelize = require('sequelize');
const { checkToken, getUsuario } = require('../public/checkToken');
const Op = Sequelize.Op;


router.get('/',checkToken, (req, res) => {
    const usuario = getUsuario(req);
    const msg = req.query.msg;
    res.render('cadastrarempresa',{
        usuario,
        msg: msg || ""
    })
});

router.post('/add', checkToken,(req, res) => {
        //Declarando quais são as minhas colunas dentro da minha tabela
        let { nomeEmpresa, tipoEmpresa, quantidadeEventos,emailEmpresa, telefoneEmpresa, siteEmpresa, entrarContato, observacoes } = req.body;
        const usuario = getUsuario(req);
        if (!usuario || !usuario.id) {
        console.log('DEBUG: Usuário não autenticado ou ID ausente. Redirecionando para login.');
        return res.redirect('/login');
        }
        if (!nomeEmpresa) {
            return res.status(422).json({ msg: 'Por favor indicar o nome da Empresa' })
        }
        if (!tipoEmpresa) {
            return res.status(422).json({ msg: 'Por favor indicar o tipo da Empresa' })
        }
        if (!quantidadeEventos) {
            return res.status(422).json({ msg: 'Por favor indicar a quantidadeEventos' })
        }
        if (!emailEmpresa) {
            return res.status(422).json({ msg: 'Por favor indicar o email da Empresa' })
        }
        if (!telefoneEmpresa) {
            return res.status(422).json({ msg: 'Por favor indicar o telefone da Empresa' })
        }
        if (!siteEmpresa) {
            return res.status(422).json({ msg: 'Por favor indicar o siteEmpresa' })
        }
        if (!observacoes) {
            return res.status(422).json({ msg: 'Por favor indicar uma observacoes' })
        }
        criadorEmpresa = usuario.id
        try {
            const empresasDoUsuario =  Empresas.findAll({
            where: {
                usuarioID: criadorEmpresa
            },
            order: [
                ['createdAt', 'DESC']
            ],
            raw: true,
            attributes: [
                'usuarioID',
            ]
        });
            if(!empresasDoUsuario){
             Empresas.create({
                    nomeEmpresa,
                    tipoEmpresa,
                    quantidadeEventos,
                    usuarioID: usuario.id,
                    emailEmpresa,
                    telefoneEmpresa,
                    siteEmpresa,
                    entrarContato,
                    observacoes
                })
                //Caso sucesso redireciona a pagina inicial
                .then(() => res.redirect('/dashboard'))
                //Caso falhe mostra o erro
                .catch(err => console.log(err));
            }else{
                     return res.redirect('/cadastrarEmpresa?msg=empresa_existente');


            }

        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde' })
        }
    })
    // insert ao banco


module.exports = router