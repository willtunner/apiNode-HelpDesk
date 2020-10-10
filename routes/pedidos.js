const express = require('express');
const router = express.Router();
// no arquivo mysql.js está exportando como pool
const mysql = require('../mysql').pool;

// Lista todos os pedidos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM pedidos',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    // Retorna a quantidade de produtos achados no banco
                    quantidade: result.length,

                    // Pega os produtos separados
                    // Usa o map para pegar cada item retornado do banco
                    // Chama de prod os valores retornados
                    pedidos: result.map(pedido => {
                        // Retorna um novo padrão
                        return {
                            id_pedido: pedido.id_pedido,
                            quantidade: pedido.quantidade,
                            id_produto: pedido.id_produto,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os pedidos',
                                url: 'http://localhost:3000/pedidos/' + pedido.id_pedido
                            }
                        }
                    })
                }

                return res.status(200).send(response)
            }
        )
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
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        // Verifica se existe o produto antes de inserir
        conn.query('SELECT * FROM produtos WHERE id_produto = ?',
            [req.body.id_produto],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Produto não encontrado'
                    })
                }

                conn.query(
                    'INSERT INTO pedidos (id_produto, quantidade) VALUES ( ?, ?)',
                    [req.body.id_produto, req.body.quantidade],
                    (error, result, field) => {
                        conn.release();
                        if (error) { return res.status(500).send({ error: error }) }
                        const response = {
                            mensagem: 'Pedido inserido com sucesso',
                            pedidoCriado: {
                                id_pedido: result.id_pedido,
                                id_produto: req.body.id_produto,
                                quantidade: req.body.quantidade,
                                request: {
                                    tipo: 'GET',
                                    descricao: 'Retorna todos os pedidos',
                                    url: 'hhtp://localhost:3000/pedidos'
                                }
                            }
                        }
                        return res.status(201).send(response);
                    }
                )
            });
    });

});

// Lista um pedido por id
/**
 * Insominia: rota como get: base_url(localhost:300)/pedidos/algumacoisa
 */
router.get('/:id_pedido', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM pedidos WHERE id_pedido = ?',
            [req.params.id_pedido], // Passa o id do produto para o sql

            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                // Response criado - passo 7

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado pedido com esse id'
                    })
                }

                const response = {
                    pedido: {
                        id_pedido: result[0].id_pedido,
                        quantidade: result[0].quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um pedido',
                            url: 'http://localhost:3000/pedidos'
                        }
                    }
                }

                // status 201: add 
                res.status(201).send(response);
            }
        )
    });
});


// Deleta um pedido
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `DELETE FROM pedidos WHERE id_pedido = ?`,
            [req.body.id_pedido],
            // CallBack
            (error, result, field) => {
                // Fecha a conexão
                // Pool de conexões tem um limite de conexões abertas
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    mensagem: 'Pedido removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um pedido',
                        url: 'http://localhost:3000/pedidos',
                        body: {
                            id_produto: 'Int',
                            quantidade: 'String'
                        }
                    }
                }
                // status 201: add 
                return res.status(202).send(response);
            }
        )
    });
});


// Altera um pedido
router.put('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query('SELECT * FROM produtos WHERE id_produto = ?',
            [req.body.id_produto],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Produto não encontrado'
                    })
                }

                conn.query(
                    `UPDATE pedidos SET 
                    quantidade = ?, 
                    id_produto = ? 
                    WHERE  id_pedido = ?;`,
                    [
                        req.body.quantidade, 
                        req.body.id_produto, 
                        req.body.id_pedido
                    ],
                    // CallBack
                    (error, result, field) => {
                        // Fecha a conexão
                        // Pool de conexões tem um limite de conexões abertas
                        conn.release();

                        if (error) { return res.status(500).send({ error: error }) }

                        // Response criado - passo 7
                        const response = {
                            mensagem: 'Pedido atualizado com Sucesso',
                            produtoAtualizado: {
                                id_pedido: req.body.id_pedido,
                                quantidade: req.body.quantidade,
                                id_produto: req.body.id_produto,
                                request: {
                                    tipo: 'GET',
                                    descricao: 'Atualiza um pedido',
                                    url: 'http://localhost:3000/pedidos/' + req.body.id_pedido
                                }
                            }
                        }

                        // status 201: add 
                        res.status(202).send(response);
                    }
                )
            });
    }); // GetConnection
});


module.exports = router;