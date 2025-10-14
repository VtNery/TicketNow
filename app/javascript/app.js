const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/connection');
const Eventos = require('./models/Evento'); // Modelo de Evento
const Sequelize = require('sequelize'); // Importe o Sequelize para usar Op.like na rota raiz
const Op = Sequelize.Op; // Importe Op para operadores Sequelize
const cookieParser = require('cookie-parser');
// const handlebars = require('handlebars'); // Não é necessário importar Handlebars diretamente aqui, exphbs já o faz
const { checkToken, getUsuario } = require('./public/checkToken'); // Verifique o caminho, geralmente middlewares ficam fora de 'public'
const Usuario = require('./models/Usuario'); // Modelo de Usuário

// Importe as rotas
const pagamentoRoutes = require('./routes/pagamento');
const usuariosRoutes = require('./routes/usuarios');
const eventosRoutes = require('./routes/eventos'); // Rota geral de eventos (talvez para listagem pública)
const cadastrarempresaRoutes = require('./routes/cadastrarempresa');
const loginRoutes = require('./routes/login');
const ajudaRoutes = require('./routes/ajuda');
const dashboardRoutes = require('./routes/dashboard'); // Rota do dashboard do usuário
const registrarRoutes = require('./routes/registrar');
const cadastrareventoRoutes = require('./routes/cadastrarevento'); // Rota para cadastro de eventos
const registroConfirmacaoRoutes = require('./routes/registroConfirmacao');
const paginaEventoRoutes = require('./routes/paginaEvento');
const dadosBancariosRoutes = require('./routes/dadosBancarios');
const eventApiRoutes = require('./routes/eventos'); // NOVA ROTA DE API PARA EDIÇÃO/EXCLUSÃO DE EVENTOS


// Configurar cookie-parser
app.use(cookieParser());

// Configurar body-parser para JSON e URL-encoded
app.use(express.json()); // Para requests com payload JSON
app.use(bodyParser.urlencoded({ extended: false })); // Para dados de formulários HTML

const PORT = 3000;

// Conexão com o banco de dados
db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar", err)
    });

// Configuração do Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main', // Defina seu layout padrão, se tiver
    helpers: {
        // Helper para converter objeto em string JSON (usado para passar dados para Alpine.js)
        json: function (context) {
            return JSON.stringify(context);
        }
    }
}));
app.set('view engine', 'handlebars');

// Pasta estática
app.use(express.static(path.join(__dirname, 'public')));

// Rota raiz (mantida como estava, mas considere se ela deve ser a mesma do dashboard)
app.get('/', checkToken, async (req, res) => {
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
            res.render('eventos', { // Renderiza a página 'eventos'
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
});

// Rotas para os outros endpoints
app.use('/usuarios', usuariosRoutes);
app.use('/eventos', eventosRoutes);
app.use('/cadastrarempresa', cadastrarempresaRoutes);
app.use('/login', loginRoutes);
app.use('/ajuda', ajudaRoutes);
app.use('/dashboard', dashboardRoutes); // Rota do dashboard do usuário
app.use('/registrar', registrarRoutes);
app.use('/cadastrarevento', cadastrareventoRoutes); // Rota para o formulário/processamento de cadastro
app.use('/registroConfirmacao', registroConfirmacaoRoutes);
app.use('/paginaEvento', paginaEventoRoutes);
app.use('/dadosBancarios', dadosBancariosRoutes);
app.use('/pagamento', pagamentoRoutes);
app.use('/eventos', eventApiRoutes); // REGISTRO DA NOVA ROTA DE API PARA EDIÇÃO DE EVENTOS

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});