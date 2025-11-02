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
        
router.get('/api/usuario', checkToken, (req, res) => {
  const usuario = getUsuario(req); // usa req.usuarioLogado
  if (!usuario) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }

  // Retorne só os dados que você precisa no frontend
  res.json({
    nome: usuario.nome,
    cpf: usuario.cpf,
    email: usuario.email,
    admin: usuario.admin
  });

  console.log(usuario)
});
module.exports = router;