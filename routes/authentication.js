const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const createAdm = require('../model/adm');
const valid = require('../helpers/valid_auth');

router.post("/login", (req,res)=>{
    let {email, senha} = req.body;
    if(email == "hebertwilly@hotmail.com" && senha == "123"){
        let token = jwt.sign({email: email}, '123@!#', {expiresIn: '10 min'});
        res.json({logged: true, token: token, user: email});
    }else{
        res.status(403).json({logged: false, error: "Usuario e senha invalidas"});
    }
});

router.post("/criarConta", (req, res)=>{
    let {id, email, senha} = req.body;
    let adm = {id, email, senha};
    if(adm){
        createAdm.createAdm(adm);
        res.json({amd: adm, mensagem: "conta criada"});
    }else{
        res.status(403).json({amd: false, error: "erro ao criar conta"});
    }
})

router.get("/", valid.valid, (req, res)=>{
    let users = createAdm.listAdm();

    res.json({users: users});
})

module.exports = router