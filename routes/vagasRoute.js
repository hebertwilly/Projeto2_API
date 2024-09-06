const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const valid = require('../helpers/valid_auth');
const {createVaga, deleteVaga, getVagaById} = require('../controller/vagaService');
const {getAdmById} = require('../controller/admService');
const geraId = require('../helpers/contador');

router.post("/postVaga", valid.auth, async (req,res)=>{
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

router.delete("/deleteVaga/:id", valid.auth, async (req, res)=>{
    const id = parseInt(req.params.id, 10);
    const email = req.email;

    if (isNaN(id)) {
        return res.status(400).send('ID inválido.');
    }

    const valida = await getAdmById(email);
    if(valida !== null){
        const result = await deleteVaga(id);
        if(result === false){
            res.status(403).json({vaga: id, error: "Não foi possivel remover o usuario"});
        }else{
            res.json({vaga: id, mensagem: "Removido com sucesso"});
        }
    }else{
        res.json({error: "você não tem autorização para remover"})
    }
});


router.get("/vaga/:id", valid.auth, async(req, res)=>{
    const id = parseInt(req.params.id, 10);

    if(isNaN(id)){
        return res.status(400).send('ID invalido.');
    }

    const vaga = await getVagaById(id);
    if(vaga !== null){
        res.json({vaga: vaga});
    }else{
        res.json({erro: "usuario não encontrado"});
    }
});


module.exports = router;