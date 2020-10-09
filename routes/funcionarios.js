const express = require('express');
const router = express.Router();
// no arquivo mysql.js está exportando como pool
const mysql = require('../mysql').pool;

// Lista todos os produtos
router.get('/', (req, res, next) => {
    // status 200: OK
    res.status(200).send({
        mensagem: 'Lista todos os funcionarios'
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

    // Pega o id passado pela rota
    const id = req.params.id_produto;

    // Verifica se o id é igual o id especial
    if (id === 'especial') {// se for
        // status 200: OK
        res.status(200).send({
            mensagem: 'Você passou um id especial',
            id: id
        });
    } else {
        // status 200: OK
        res.status(200).send({
            mensagem: 'Você passou um id'
        });
    }
});

// Altera um produto
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: "Funcionário alterado"
    });
});

// Deleta um produto
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: "Funcionário excluido"
    });
});

module.exports = router;