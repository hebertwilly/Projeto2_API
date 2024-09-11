const express = require('express');
const Adm = require('../model/adm');
const Frentista = require('../model/frentista');
const Abastecimento = require('../model/abastecimento');
const contador = require('../helpers/contador'); 
const { createAdm } = require('../controller/admService');
const router = express.Router();

router.get('/install', async(req, res)=>{
    try{
        const adminsCount = await Adm.countDocuments({});
        if (adminsCount > 0) {
          return res.status(400).json({ message: 'Já existem administradores na coleção.' });
        }

        const admin = { email: 'admin@admin.com', senha: '1234' };
        const novoAdmin = await createAdm(admin);
        if (!novoAdmin) {
            return res.status(500).json({ message: 'Erro ao criar usuário administrador.' });
        }

        const frentistas = [
            { nome: 'frentista1', email: 'frentista1@example.com', senha: 'senha123' },
            { nome: 'frentista2', email: 'frentista2@example.com', senha: 'senha123' },
            { nome: 'frentista3', email: 'frentista3@example.com', senha: 'senha123' },
            { nome: 'frentista4', email: 'frentista4@example.com', senha: 'senha123' },
            { nome: 'frentista5', email: 'frentista5@example.com', senha: 'senha123' }
        ];
        const frentistasInseridos = await Frentista.insertMany(frentistas);

        const abastecimentos = await Promise.all(frentistasInseridos.map(async (frentista) => {
            const idAbastecida = await contador('Abastecida');
            return {
                idFrentista: frentista._id,
                idAbastecida, 
                bico: 1, 
                combustivel: 'Gasolina', 
                ppl: 5.0, 
                litros: 10, 
                total: 50.0, 
            };
        }));

        await Abastecimento.insertMany(abastecimentos);

        res.status(201).json({ message: 'Banco de dados instalado e populado com sucesso.'});
    }catch(error){
        res.status(500).json({ message: 'Erro ao instalar e popular o banco de dados.', error});
    }
});


module.exports = router