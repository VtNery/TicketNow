const jwt = require('jsonwebtoken');
const secret = 'ahsdoahsdkahjsokHUASDADJAIKOasdaioiasjdlkdajq';



function checkToken(req, res, next) {
    const tokenCookies = req.cookies.token;

    if (!tokenCookies) {
        return res.redirect('/Login');
    }

    try {
        
        const decoded = jwt.verify(tokenCookies, secret);

        // Se o token for válido, você pode armazenar os detalhes do usuário na solicitação para uso posterior
        req.usuarioLogado = decoded;

        next();
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return res.redirect('/Login');
    }
}
function getUsuario(req) {
    return req.usuarioLogado || null;
}

module.exports = {
    checkToken,
    getUsuario
};