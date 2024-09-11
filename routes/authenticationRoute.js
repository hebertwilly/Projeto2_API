const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const valid = require('../helpers/valid_auth');

const {createAdm, deleteAdm, getAdmById, updateAdm} = require('../controller/admService');
const {createFrentista, deleteFrentista, getFrentistaById, updateFrentista} = require('../controller/frentistaService');

router.post("/login", async (req, res) => {
    let { email, senha } = req.body;
    
    const frentista = await getFrentistaById(email);

    if (frentista === false) {
        res.status(400).json({error: "usuario não encontrado"})
    }else{
        if(frentista.senha === senha){
            let token = jwt.sign({ email: frentista.email, _id: frentista._id}, '123@!#', { expiresIn: '10m' });  // ExpiresIn ajustado para '10m'
            res.json({ logged: true, token: token, _id: frentista._id, email: frentista.email});
        }else {
            res.status(403).json({ logged: false, error: "Senha inválidos" });
        }
    }
});

// Rota de criação de conta user
router.post("/criarConta", async (req, res) => {
    let { nome, email, senha } = req.body;
    let frentista = {nome, email, senha};

    const newFrentista = await createFrentista(frentista);
    if(newFrentista === false){
        res.status(403).json({error: "Erro ao cadastrar usuario"});
    }else{
        res.json({res: "usuario criado", frentista: newFrentista});
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
    if(valida === false){
        res.json({mensagem: "Você precisa ter uma conta adm para criar um adm"});
    }else{
        const newAdm = await createAdm(adm);
        
        if(newAdm !== null){
            res.json({res: "Adm Criado", adm: newAdm});
        }else{
            res.status(403).json({error: "Error ao criar adm"});
        }
    }
});

module.exports = router;