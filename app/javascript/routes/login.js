const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const { emailCPFLogin, password } = req.body;

    if (!emailCPFLogin) {
        return res.status(422).json({msg:'Por favor indicar um email'})
    }
    if (!password) {
        return res.status(422).json({msg:'Por favor indicar uma senha'})
    }
    const usuario = await Usuario.findOne({              
        where: {
            [Op.or]: [
                { email: { [Op.like]: emailCPFLogin } },
                { CPF: { [Op.like]: emailCPFLogin } }
            ],
        }
    })
    if(!usuario){
        res.render('login',
        {
            senhaIncorreta: 1
        }
)
    }else{
        //Validando senha do usuário
        const checkPassword = await bcrypt.compare(password, usuario.senha)
        if(!checkPassword){
            res.render('login',
                {
                    senhaIncorreta: 1
                }
        )
        }else{
            try {

                const secret = 'ahsdoahsdkahjsokHUASDADJAIKOasdaioiasjdlkdajq';
                
                const token = jwt.sign({
                    id: usuario.usuarioid,                    
                    nome: usuario.nome,
                    cpf :usuario.CPF,
                    email : usuario.email,
                    dataNascimento : usuario.datanascimento,
                    admin : usuario.administrador

                },
                secret,
                )

                
                console.log(token);                

                res.cookie("token", token,{
                    httpOnly:true,
                });
                res.redirect('/')

            } catch (error) {
                console.log(error)

                res.status(500).json({
                    msg:'Aconteceu um erro no servidor, tente novamente mais tarde'
                })
            }
        }
    }

});

module.exports = router;