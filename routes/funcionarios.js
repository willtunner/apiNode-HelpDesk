const express = require('express');
const router = express.Router();

// Lista todos os produtos
router.get('/', (req, res, next) => {
    // status 200: OK
    res.status(200).send({
        mensagem: 'Lista todos os funcionarios'
    });
});

// Cadastra um produto
router.post('/', (req, res, next) => {

    // Recebe o produdo pelo req.body passado pelo insominia
    const funcionario = {
        nome: req.body.nome,
        phone: req.body.phone,
        email: req.body.email,
        genero: req.body.genero,
        id_emp: req.body.id_emp,
        conexao: req.body.conexao
    }

    // status 201: add 
    res.status(201).send({
        mensagem: 'Cadastra um funcionário',
        funcionarioCriado: funcionario
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
    if (id === 'especial'){// se for
        // status 200: OK
    res.status(200).send({
        mensagem: 'Você passou um id especial',
        id: id
    });
    }else{
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