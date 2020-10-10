const express = require('express');
const router = express.Router();
// no arquivo mysql.js está exportando como pool
const mysql = require('../mysql').pool;

// Lista todos os produtos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM funcionarios',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    // Retorna a quantidade de produtos achados no banco
                    quantidade: result.length,

                    // Pega os produtos separados
                    // Usa o map para pegar cada item retornado do banco
                    // Chama de prod os valores retornados
                    funcionarios: result.map(funcionario => {
                        // Retorna um novo padrão
                        return {
                            id_func: funcionario.id_func,
                            name: funcionario.name,
                            email: funcionario.email,
                            genero: funcionario.genero,
                            id_emp: funcionario.id_emp,
                            conexao: funcionario.conexao,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os pedidos',
                                url: 'http://localhost:3000/funcionarios/' + funcionario.id_func
                            }
                        }
                    })
                }

                return res.status(200).send(response)
            }
        )
    });
});

// Cadastra um produto
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        // Verifica se existe a empresa antes de inserir
        conn.query('SELECT * FROM empresas WHERE id_emp = ?',
            [req.body.id_emp],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Empresa não encontrada'
                    })
                }

                conn.query(
                    'INSERT INTO funcionarios (name, phone, email, genero, id_emp, conexao) VALUES (?, ?, ?, ?, ?, ?)',
                    [req.body.name, req.body.phone, req.body.email, req.body.genero, req.body.id_emp, req.body.conexao],
                    (error, result, field) => {
                        conn.release();
                        if (error) { return res.status(500).send({ error: error }) }
                        const response = {
                            mensagem: `Funcionario inserido com sucesso`,
                            pedidoCriado: {
                                id_func: result.id_func,
                                name: req.body.name,
                                phone: req.body.phone,
                                email: req.body.email,
                                genero: req.body.genero,
                                id_emp: req.body.id_emp,
                                conexao: req.body.conexao,
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

// Lista um produto por id
/**
 * Insominia: rota como get: base_url(localhost:300)/produtos/algumacoisa
 */
router.get('/:id_func', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM funcionarios WHERE id_func = ?',
            [req.params.id_func], // Passa o id do produto para o sql

            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                // Response criado - passo 7

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado um funcionário com esse id'
                    })
                }

                const response = {
                    funcionario: {
                        id_func: result[0].id_func,
                        name: result[0].name,
                        phone: result[0].phone,
                        email: result[0].email,
                        genero: result[0].genero,
                        id_emp: result[0].id_emp,
                        conexao: result[0].conexao,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um funcionário',
                            url: 'http://localhost:3000/funcionarios'
                        }
                    }
                }

                // status 201: add 
                res.status(201).send(response);
            }
        )
    });
    
});

// Altera um funcionario
router.put('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query('SELECT * FROM empresas WHERE id_emp = ?',
            [req.body.id_emp],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Empresas não encontrada'
                    })
                }

                conn.query(
                    `UPDATE funcionarios SET
                    name = ?, 
                    phone = ?, 
                    email= ?, 
                    genero = ?, 
                    id_emp = ?, 
                    conexao= ? 
                    WHERE  id_func = ?`,
                    [
                        req.body.name, 
                        req.body.phone, 
                        req.body.email, 
                        req.body.genero, 
                        req.body.id_emp, 
                        req.body.conexao, 
                        req.body.id_func
                    ],
                    // CallBack
                    (error, result, field) => {
                        // Fecha a conexão
                        // Pool de conexões tem um limite de conexões abertas
                        conn.release();

                        if (error) { return res.status(500).send({ error: error }) }

                        // Response criado - passo 7
                        const response = {
                            mensagem: 'Funcionario atualizado com Sucesso',
                            funcionarioAtualizado: {
                                id_func: result.id_func,
                                name: req.body.name,
                                phone: req.body.phone,
                                email: req.body.email,
                                genero: req.body.genero,
                                id_emp: req.body.id_emp,
                                conexao: req.body.conexao,
                                request: {
                                    tipo: 'GET',
                                    descricao: 'Lista o funcionario editado',
                                    url: 'http://localhost:3000/funcionarios/' + req.body.id_func
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

// Deleta um produto
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `DELETE FROM funcionarios WHERE id_func = ?`,
            [req.body.id_func],
            // CallBack
            (error, result, field) => {
                // Fecha a conexão
                // Pool de conexões tem um limite de conexões abertas
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    mensagem: 'Funcionário removido com sucesso',
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

module.exports = router;