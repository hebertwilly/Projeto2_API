const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const valid = require('../helpers/valid_auth');

const {createAdm, deleteAdm, getAdmById, updateAdm} = require('../controller/admService');
const {createFrentista, deleteFrentista, getFrentistaById, updateFrentista} = require('../controller/frentistaService');

router.post("/login", async (req, res) => {
    let { email, senha } = req.body;
    
    const frentista = await getFrentistaById(email);

    if (frentista !== null) {
        if(frentista.senha === senha){
            let token = jwt.sign({ email: frentista.email, _id: frentista._id}, '123@!#', { expiresIn: '10m' });  // ExpiresIn ajustado para '10m'
            res.json({ logged: true, token: token, _id: frentista._id, email: frentista.email});
        }else {
            res.status(403).json({ logged: false, error: "Senha inválidos" });
        }
    }else{
        res.status(400).json({error: "usuario não encontrado"})
    }
});

// Rota de criação de conta user
router.post("/criarConta", async (req, res) => {
    let { nome, email, senha } = req.body;
    let frentista = {nome, email, senha};

    const newFrentista = await createFrentista(frentista);
    if(newFrentista !== null){
        res.json({res: "usuario criado", frentista: newFrentista});
    }else{
        res.status(403).json({error: "Erro ao cadastrar usuario"});
    }
});

router.delete("/deleteFrentista/:email", async (req, res)=>{
    const email = req.params.email;
    
    const result = await deleteFrentista(email);
    if(result===false){
        res.json({error: "Não foi possivel remover o usuario"});
    }else{
        res.json({Frentista: email, mensagem: "conta deletada com sucesso"})
    }
});

router.get("/frentista/:email", async (req, res)=>{
    const email = req.params.email;

    const frentista = await getFrentistaById(email);
    if(frentista !== null){
        res.json({frentista: frentista});
    }else{
        res.json({erro: "usuario não encontrado"});
    }
});

router.put("/updateFrentista/:email", async (req, res)=>{
    const email = req.params.email;
    const newFrentista = req.body

        const update = await updateFrentista(email, newFrentista);
        if(update !== null){
            res.json({mensagem: "dados atualizados", frentista: update});
        }else{
            res.json({error: "usuario não atualizado"});
        }
});

router.post("/admLogin", async (req, res)=>{
    let { email, senha } = req.body;
    
    const adm = await getAdmById(email);

    if (adm !== null) {
        if(adm.senha === senha){
            let token = jwt.sign({ email: adm.email, _id: adm._id}, '123@!#', { expiresIn: '10m' });  // ExpiresIn ajustado para '10m'
            res.json({ logged: true, token: token, _id: adm._id, email: adm.email});
        }else {
            res.status(403).json({ logged: false, error: "Senha inválidos" });
        }
    }else{
        res.status(400).json({error: "usuario não encontrado"})
    }
});

router.post("/criarAdm",valid.auth, async (req, res) =>{
    let {email, senha} = req.body;
    let adm = {email, senha};

    const valida = await getAdmById(req.email);
    if(valida !== null){

        const newAdm = await createAdm(adm);
        
        if(newAdm !== null){
            res.json({res: "Adm Criado", adm: newAdm});
        }else{
            res.status(403).json({error: "Error ao criar adm"});
        }
    }else{
        res.json({mensagem: "Você precisa ter uma conta adm para criar um adm"});
    }
});

router.delete("/deleteAdm/:email",valid.auth, async (req, res)=>{
    const email = req.params.email;
    
    const valida = await getAdmById(req.email);
    if(valida !== null){
        const result = await deleteAdm(email);
        if(result===false){
            res.json({vaga: id, error: "Não foi possivel remover o usuario"});
        }else{
            res.json({conta: email, mensagem: "conta deletada com sucesso"})
        }
    }else{
        res.json({mensagem: "Você precisa ter uma conta adm para deletar um adm"});
    }
});

router.get("/adm/:email",valid.auth, async (req, res)=>{
    const adm = req.params.email;

    const valida = await getAdmById(req.email);
    if(valida !== null){
        const administrador = await getAdmById(adm);
        if(administrador !== null){
            res.json({amd: administrador});
        }else{
            res.json({erro: "usuario não encontrado"});
        }
    }else{
        res.json({mensagem: "Você precisa ter uma conta adm para achar um adm"});
    }
});

router.put("/updateAdm/:email", valid.auth, async (req, res)=>{
    const id = req.params.email;
    const adm = req.body

        const update = await updateAdm(id, adm);
        if(update !== null){
            res.json({mensagem: "dados atualizados", adm: update});
        }else{
            res.json({error: "usuario não atualizado"});
        }
});

module.exports = router;