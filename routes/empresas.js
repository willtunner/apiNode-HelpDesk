const express = require('express');
const router = express.Router();
// no arquivo mysql.js está exportando como pool
const mysql = require('../mysql').pool;

// Lista todas as empresas
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM empresas',
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
                            id_emp: prod.id_emp,
                            name: prod.name,
                            phone: prod.phone,
                            cnpj: prod.cnpj,
                            obs: prod.obs,
                            ip_scef: prod.ip_scef,
                            mac_scef: prod.mac_scef,
                            conexao_scef: prod.conexao_scef,
                            ip_nfe: prod.ip_nfe,
                            mac_nfe: prod.mac_nfe,
                            conexao_nfe: prod.conexao_nfe,
                            ip_mobile: prod.ip_mobile,
                            ip_coletor: prod.ip_coletor,
                            version_estoque: prod.version_estoque,
                            version_nfce: prod.version_nfce,
                            version_nfe: prod.version_nfe,
                            version_checkout: prod.version_checkout,
                            version_sisseg: prod.version_sisseg,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todas as empresas',
                                url: 'http://localhost:3000/empresas/' + prod.id_emp
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
    // INSERT NO BANCO
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'INSERT INTO empresas (name, phone, cnpj, obs, ip_scef, mac_scef, conexao_scef, ip_nfce, mac_nfce, conexao_nfce, ip_nfe, mac_nfe, conexao_nfe, ip_mobile, ip_coletor, version_estoque, version_nfce, version_nfe, version_checkout, version_sisseg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.body.name, req.body.phone, req.body.cnpj, req.body.obs, req.body.ip_scef, req.body.mac_scef, req.body.conexao_scef, req.body.ip_nfce, req.body.mac_nfce, req.body.conexao_nfce, req.body.ip_nfe, req.body.mac_nfe, req.body.conexao_nfe, req.body.ip_mobile, req.body.ip_coletor, req.body.version_estoque, req.body.version_nfce, req.body.version_nfe, req.body.version_checkout, req.body.version_sisseg ],
            // CallBack
            (error, result, field) => {
                // Fecha a conexão
                // Pool de conexões tem um limite de conexões abertas
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                // Response criado - passo 7
                const response = {
                    mensagem: 'Empresa Cadastrada com Sucesso',
                    empresaCriada: {
                        id_emp: result.id_emp,
                        name: req.body.name,
                        phone: req.body.phone,
                        cnpj: req.body.cnpj,
                        obs: req.body.obs,
                        ip_scef: req.body.ip_scef,
                        mac_scef: req.body.mac_scef,
                        conexao_scef: req.body.conexao_scef,
                        ip_nfce: req.body.ip_nfce,
                        mac_nfce: req.body.mac_nfce,
                        conexao_nfce: req.body.conexao_nfce,
                        ip_nfe: req.body.ip_nfe,
                        mac_nfe: req.body.mac_nfe,
                        conexao_nfe: req.body.conexao_nfe,
                        ip_mobile: req.body.ip_mobile,
                        ip_coletor: req.body.ip_coletor,
                        version_estoque: req.body.version_estoque,
                        version_nfce: req.body.version_nfce,
                        version_nfe: req.body.version_nfe,
                        version_checkout: req.body.version_checkout,
                        version_sisseg: req.body.version_sisseg,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todas as empresas',
                            url: 'http://localhost:3000/empresas/'
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
router.get('/:id_emp', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM empresas WHERE id_emp = ?',
            [req.params.id_emp], // Passa o id do produto para o sql

            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                // Response criado - passo 7

                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado produto com esse id'
                    })
                }

                const response = {
                    empresa: {
                        id_emp: result[0].id_emp,
                        name: result[0].mane,
                        phone: result[0].phone,
                        cnpj: result[0].cnpj,
                        obs: result[0].obs,
                        ip_scef: result[0].ip_scef,
                        mac_scef: result[0].mac_scef,
                        conexao_scef: result[0].conexao_scef,
                        ip_nfce: result[0].ip_nfce,
                        mac_nfce: result[0].mac_nfce,
                        conexao_nfce: result[0].conexao_nfce,
                        ip_nfe: result[0].ip_nfe,
                        mac_nfe: result[0].mac_nfe,
                        conexao_nfe: result[0].conexao_nfe,
                        ip_mobile: result[0].ip_mobile,
                        ip_coletor: result[0].ip_coletor,
                        version_estoque: result[0].version_estoque,
                        version_nfe: result[0].version_nfe,
                        version_checkout: result[0].version_checkout,
                        version_sisseg: result[0].version_sisseg,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna uma empresa',
                            url: 'http://localhost:3000/empresas'
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
            `UPDATE empresas SET 
            name = ?, 
            phone = ?, 
            cnpj = ?, 
            obs = ?, 
            ip_scef = ?, 
            mac_scef = ?, 
            conexao_scef = ?, 
            ip_nfce = ?, 
            mac_nfce = ?, 
            conexao_nfce = ?, 
            ip_nfe = ?, 
            mac_nfe = ?, 
            conexao_nfe = ?, 
            ip_mobile = ?, 
            ip_coletor = ?, 
            version_estoque = ?, 
            version_nfce = ?, 
            version_nfe = ?, 
            version_checkout = ?, 
            version_sisseg = ? 
            where id_emp = ?`,
            [
                req.body.name, 
                req.body.phone, 
                req.body.cnpj, 
                req.body.obs, 
                req.body.ip_scef, 
                req.body.mac_scef, 
                req.body.conexao_scef, 
                req.body.ip_nfce, 
                req.body.mac_nfce, 
                req.body.conexao_nfce, 
                req.body.ip_nfe, 
                req.body.mac_nfe, 
                req.body.conexao_nfe, 
                req.body.ip_mobile, 
                req.body.ip_coletor, 
                req.body.version_estoque, 
                req.body.version_nfce, 
                req.body.version_nfe, 
                req.body.version_checkout, 
                req.body.version_sisseg, 
                req.body.id_emp 
            ],
            // CallBack
            (error, result, field) => {
                // Fecha a conexão
                // Pool de conexões tem um limite de conexões abertas
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                // Response criado - passo 7
                const response = {
                    mensagem: 'Empresa atualizada com Sucesso',
                    produtoAtualizado: {
                        id_emp: result.id_emp,
                        name: req.body.name,
                        phone: req.body.phone,
                        cnpj: req.body.cnpj,
                        obs: req.body.obs,
                        ip_scef: req.body.ip_scef,
                        mac_scef: req.body.mac_scef,
                        conexao_scef: req.body.conexao_scef,
                        ip_nfce: req.body.ip_nfce,
                        mac_nfce: req.body.mac_nfce,
                        conexao_nfce: req.body.conexao_nfce,
                        ip_nfe: req.body.ip_nfe,
                        mac_nfe: req.body.mac_nfe,
                        conexao_nfe: req.body.conexao_nfe,
                        ip_mobile: req.body.ip_mobile,
                        ip_coletor: req.body.ip_coletor,
                        version_estoque: req.body.version_estoque,
                        version_nfce: req.body.version_nfce,
                        version_nfe: req.body.version_nfe,
                        version_checkout: req.body.version_checkout,
                        version_sisseg: req.body.version_sisseg,
                        request: {
                            tipo: 'GET',
                            descricao: 'Atualiza um produto',
                            url: 'http://localhost:3000/empresas/' + req.body.id_emp
                        }
                    }
                }

                // status 201: add 
                res.status(202).send(response);
            }
        )
    });
});

// Deleta um Empresa
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `DELETE FROM empresas WHERE id_emp = ?`,
            [req.body.id_emp],
            // CallBack
            (error, result, field) => {
                // Fecha a conexão
                // Pool de conexões tem um limite de conexões abertas
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    mensagem: 'Empresa removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere uma empresa',
                        url: 'http://localhost:3000/empresas',
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