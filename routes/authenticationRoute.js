const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const valid = require('../helpers/valid_auth');

const {createAdm, deleteAdm, getAdmById} = require('../controller/admService');
const {createUser, deleteConta, getUserById} = require('../controller/userService');


router.post("/login", async (req, res) => {
    let { email, senha } = req.body;
    
    const user = await getUserById(email);

    if (user !== null) {
        if(user.senha === senha){
            let token = jwt.sign({ email: email }, '123@!#', { expiresIn: '10m' });  // ExpiresIn ajustado para '10m'
            res.json({ logged: true, token: token, user: user.senha });
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
    let usuario = {nome, email, senha};

    const newUser = await createUser(usuario);
    if(newUser !== null){
        res.json({res: "usuario criado", user: newUser});
    }else{
        res.status(403).json({error: "Erro ao cadastrar usuario"});
    }
});

router.delete("/deleteConta/:email",valid.auth, async (req, res)=>{
    const email = req.params.email;
    
    const result = await deleteConta(email);
    if(result===false){
        res.json({vaga: id, error: "Não foi possivel remover o usuario"});
    }else{
        res.json({conta: email, mensagem: "conta deletada com sucesso"})
    }
});

router.get("/usuario/:email",valid.auth, async (req, res)=>{
    const user = req.params.email;

    const usuario = await getUserById(user);
    if(usuario !== null){
        res.json({user: usuario});
    }else{
        res.json({erro: "usuario não encontrado"});
    }
});

router.post("/admLogin", async (req, res)=>{
    let { email, senha } = req.body;
    
    const adm = await getAdmById(email);

    if (adm !== null) {
        if(adm.senha === senha){
            let token = jwt.sign({ email: email }, '123@!#', { expiresIn: '10m' });  // ExpiresIn ajustado para '10m'
            res.json({ logged: true, token: token, user: adm.senha });
        }else {
            res.status(403).json({ logged: false, error: "Senha inválidos" });
        }
    }else{
        res.status(400).json({error: "usuario não encontrado"})
    }
})

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

module.exports = router;