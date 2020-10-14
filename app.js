const express = require('express');
const app = express();
const morgan = require('morgan');
// coloca pasta uploads como publica
app.use('/uploads', express.static('uploads'));
const bodyparser = require("body-parser");


/**
 * ROTAS PARA O SUPORTDESK
 */

 // Importa a rota de EMPRESAS
const rotaEmpresas = require('./routes/empresas');
const rotaFuncionarios = require('./routes/funcionarios');



/**
 * ROTAS PARA O TUTORIAL
 */
// Importa a rota de produtos
const rotaProdutos = require('./routes/produtos');
// Importa a rota de pedidos
const rotaPedidos = require('./routes/pedidos');




// Executa um callback para monitorar as rotas
app.use(morgan('dev'));

// conf do body-parser
app.use(bodyparser.urlencoded({ extended: false }));// Apenas dados simples
app.use(bodyparser.json());// Json de entrada no body

// Configura o CORS
app.use((req, res, next) => {
    // no lugar do *(aceita todos) podemos colocar qual servidor vai acessar
    // Ex: https:
    res.header('Acces-Control-Allow-Origin', '*');// Qual servidor vai acessar a api
    res.header(
        'Acess-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if( req.method === 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PACTH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
})

// Cria a rota produtos 
app.use('/empresas', rotaEmpresas);
app.use('/funcionarios', rotaFuncionarios);

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

// Quando não encontrar nenhuma rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.mensage
        }
    });
});


// USADO PARA TESTE NO INICIO
// app.use('/teste', (req, res, next) => {
//     res.status(200).send({
//         mensagem: 'Ok, Deu certo'
//     });
// });

module.exports = app;