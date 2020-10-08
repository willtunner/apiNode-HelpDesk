const express = require('express');
const router = express.Router();

// Lista todos os pedidos
router.get('/', (req, res, next) => {
    // status 200: OK
    res.status(200).send({
        mensagem: 'Lista todos os pedidos'
    });
});

// Cadastra um pedido
/**
 * No insominia
 * localhost:3000/pedidos | como post definido na rota abaixo
 * {
	"id_produto": 1,
	"quantidade": 22
    }
 */
router.post('/', (req, res, next) => {

    // Recebe o pedido pelo req.body passado pelo insominia
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }

    // status 201: add 
    res.status(201).send({
        mensagem: 'O pedido foi inserido ',
        pedidoCriado: pedido
    });
});

// Lista um pedido por id
/**
 * Insominia: rota como get: base_url(localhost:300)/pedidos/algumacoisa
 */
router.get('/:id_pedido', (req, res, next) => {

    // Pega o id passado pela rota
    const id = req.params.id_pedido;

    // Verifica se o id é igual o id especial
    if (id === 'especial'){// se for
        // status 200: OK
    res.status(200).send({
        mensagem: 'Detalhes do pedido',
        id_pedido: id
    });
    }else{
        res.status(500).send({
            mensagem: 'Pedido não encontrado',
        });
    }
});


// Deleta um pedido
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: "Pedido excluido"
    });
});

module.exports = router;