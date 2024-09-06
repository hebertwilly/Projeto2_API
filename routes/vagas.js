const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const valid = require('../helpers/valid_auth');
const createVaga = require('../controller/vagaService');
const geraId = require('../helpers/contador');

router.post("/postVaga", async (req,res)=>{
    const {nome, empresa, descricao} = req.body;
    const novoId = await geraId('idVaga');

    let vaga = {idVaga:novoId, nome, empresa, descricao};

    const newVaga = await createVaga(vaga);
    if(newVaga !== null){
        res.json({res: "Vaga Criada com sucesso", vaga: newVaga});
    }else{
        res.status(403).json({error: "Erro ao criar a vaga"});
    }
});

module.exports = router;