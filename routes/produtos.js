const express = require('express');
const router = express.Router();
// no arquivo mysql.js está exportando como pool
const mysql = require('../mysql').pool;

// Lista todos os produtos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM produtos',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    // Retorna a quantidade de produtos achados no banco
                    quantidade: result.length,

                    // Pega os produtos separados
                    // Usa o map para pegar cada item retornado do banco
                    // Chama de prod os valores retornados
                    produtos: result.map(prod => {
                        // Retorna um novo padrão
                        return {
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os produtos',
                                url: 'http://localhost:3000/produtos/' + prod.id_produto
                            }
                        }
                    })
                }

                return res.status(200).send(response)
            }
        )
    });
});

// Cadastra produto
router.post('/', (req, res, next) => {

    // INSERT NO BANCO
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            // CallBack
            (error, result, field) => {
                // Fecha a conexão
                // Pool de conexões tem um limite de conexões abertas
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                // Response criado - passo 7
                const response = {
                    mensagem: 'Produto inserido com Sucesso',
                    produtoCriado: {
                        id_produto: result.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um produto',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }

                // status 201: add 
                res.status(201).send(response);
            }
        )
    });
});

// Lista um produto por id
/**
 * Insominia: rota como get: base_url(localhost:300)/produtos/algumacoisa
 */
router.get('/:id_produto', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?',
            [req.params.id_produto], // Passa o id do produto para o sql

            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                // Response criado - passo 7

                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado produto com esse id'
                    })
                }

                const response = {
                    produto: {
                        id_produto: result[0].id_produto,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um produto',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }

                // status 201: add 
                res.status(201).send(response);
            }
        )
    });
});

// Altera um produto
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `UPDATE produtos SET nome = ?, preco = ? where id_produto = ?`,
            [req.body.nome, req.body.preco, req.body.id_produto],
            // CallBack
            (error, result, field) => {
                // Fecha a conexão
                // Pool de conexões tem um limite de conexões abertas
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                // Response criado - passo 7
                const response = {
                    mensagem: 'Produto atualizado com Sucesso',
                    produtoAtualizado: {
                        id_produto: req.body.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: 'GET',
                            descricao: 'Atualiza um produto',
                            url: 'http://localhost:3000/produtos/' + req.body.id_produto
                        }
                    }
                }

                // status 201: add 
                res.status(202).send(response);
            }
        )
    });
});

// Deleta um produto
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `DELETE FROM produtos WHERE id_produto = ?`,
            [req.body.id_produto],
            // CallBack
            (error, result, field) => {
                // Fecha a conexão
                // Pool de conexões tem um limite de conexões abertas
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    mensagem: 'Produto removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um produto',
                        url: 'http://localhost:3000/produtos',
                        body: {
                            nome: 'String',
                            preco: 'Number'
                        }
                    }
                }
                // status 201: add 
               return res.status(202).send(response);
            }
        )
    });
});

module.exports = router;