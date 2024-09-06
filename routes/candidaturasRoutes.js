const express = require('express');
const router = express.Router();

const valid = require('../helpers/valid_auth');
geraId = require('../helpers/contador');

const {createCandidatura, deleteCandidatura, getCandidaturaById, listCandidaturas} = require('../controller/candidaturaService');

router.post("/postCandidatura", async (req,res)=>{
    const {idVaga,candidato} = req.body;
    const id = await geraId('idCandidatura');

    let candidatura = {idCandidatura: id, idVaga, candidato};

    const newCandidatura = await createCandidatura(candidatura);
    if(newCandidatura !==null){
        res.json({res: "Você se candidatou a essa vaga com sucesso", candidatura: newCandidatura});
    }else{
        res.status(403).json({error: "erro ao se candidatar"});
    } 
});

router.delete("/deleteCandidatura/:id", async (req, res)=>{
    const id = parseInt(req.params.id, 10);

    if(isNaN(id)){
        return res.status(400).send('ID invalido');
    }

    const result = await deleteCandidatura(id);
    if(result === false){
        res.status(403).json({candidatura: id, error:"Não foi possivel remover a candidatura"});
    }else{
        res.json({candidatura: id, mensagem: "Candidatura desfeita"})
    }
});

router.get("/candidatura/:id", async(req, res)=>{
    const id = parseInt(req.params.id, 10);

    if(isNaN(id)){
        return res.status(400).send('ID invalido');
    }

    const candidatura = await getCandidaturaById(id);
    if(candidatura !== null){
        res.json({candidatura: candidatura});
    }else{
        res.json({erro: "Candidatura não encontrada"});
    }
});

router.get("/minhasCandidaturas", valid.auth, async(req, res)=>{
    const user = req.email

    try{
        const candidaturas = await listCandidaturas(user);
        
        if(candidaturas !== null){
            res.json({candidaturas: candidatura});
        }else{
            res.json({Error: "Erro ao listar"});
        }
    }catch(error){
        res.json({error: error});
    }
});

module.exports = router;