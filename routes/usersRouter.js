const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const valid = require('../helpers/valid_auth');

const {deleteAdm, getAdmById, updateAdm} = require('../controller/admService');
const {deleteFrentista, getFrentistaById, updateFrentista, listFrentistas} = require('../controller/frentistaService');

router.delete("/deleteFrentista/:email", valid.auth, async (req, res)=>{
    const email = req.params.email;

    const valida = await getAdmById(req.email);

    if(valida === false){
        console.log("Não é um usuario adm");
        res.json({error: "Somente administradores podem remover um frentista"});
    }else{
        const result = await deleteFrentista(email);
        if(result===false){
            res.json({error: "Não foi possivel remover o usuario"});
        }else{
            res.json({Frentista: email, mensagem: "frentista deletado com sucesso"})
        }
    }
});

router.get("/frentista/:email", valid.auth, async (req, res)=>{
    const email = req.params.email;

    const frentista = await getFrentistaById(email);
    if(frentista === false){
        res.json({erro: "usuario não encontrado"});
    }else{
        res.json({frentista: frentista});
    }
});


router.get("/frentistas", valid.auth, async (req, res)=>{
    const {page = 1} = req.query;

    const frentistas = await listFrentistas(page);

    if(frentistas === false){
        console.log(frentistas);
        res.json({error: "Erro ao listar frentistas"});
    }else{
        console.log("Frentistas listados", frentistas);
        res.json({frentistas: frentistas, message: "frentistas listados com sucesso"});
    }
});

router.put("/updateFrentista/:email", valid.auth, async (req, res)=>{
    const id = req.params.email;
    const {nome, email, senha} = req.body
    const newFrentista = {nome, email, senha}
    const update = await updateFrentista(id, newFrentista);

    if(update === false){
        res.json({error: "usuario não atualizado"});
    }else{
        res.json({mensagem: "dados atualizados", frentista: update});
    }
});

router.delete("/deleteAdm/:email",valid.auth, async (req, res)=>{
    const email = req.params.email;
    
    const valida = await getAdmById(req.email);
    if(valida === false){
        res.json({mensagem: "Você precisa ter uma conta adm para deletar um adm"});
    }else{
        const result = await deleteAdm(email);
        if(result===false){
            res.json({vaga: id, error: "Não foi possivel remover o usuario"});
        }else{
            res.json({conta: email, mensagem: "conta deletada com sucesso"})
        }
    }
});

router.get("/adm/:email",valid.auth, async (req, res)=>{
    const adm = req.params.email;

    const valida = await getAdmById(req.email);
    if(valida === false){
        res.json({mensagem: "Você precisa ter uma conta adm para achar um adm"});
    }else{
        const administrador = await getAdmById(adm);
        if(administrador !== null){
            res.json({adm: administrador});
        }else{
            res.json({erro: "usuario não encontrado"});
        }
    }
});

router.put("/updateAdm/:email", valid.auth, async (req, res)=>{
    const id = req.params.email;
    const {email, senha} = req.body
    const adm = {email, senha}

    const valida = getAdmById(req.email);

    if(valida === false){
        res.json({mensagem: "Você precisa ter uma conta adm para atualizar um adm"});
    }else{
        const update = await updateAdm(id, adm);
        if(update === false){
            res.json({error: "usuario não atualizado"});
        }else{
            res.json({mensagem: "dados atualizados", adm: update});
        }
    }
});

module.exports = router;