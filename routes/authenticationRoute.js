const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const valid = require('../helpers/valid_auth');
const createAdm = require('../controller/admService');
const createUser = require('../controller/userService');


router.post("/login", (req, res) => {
    let { email, senha } = req.body;
    // Exemplo de validação simples de login
    if (email === "hebertwilly@hotmail.com" && senha === "123") {
        let token = jwt.sign({ email: email }, '123@!#', { expiresIn: '10m' });  // ExpiresIn ajustado para '10m'
        res.json({ logged: true, token: token, user: email });
    } else {
        res.status(403).json({ logged: false, error: "Usuário ou senha inválidos" });
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

router.post("/criarAdm", async (req, res) =>{
    let {email, senha} = req.body;
    let adm = {email, senha};

    const newAdm = await createAdm(adm);

    if(newAdm !== null){
        res.json({res: "Adm Criado", adm: newAdm});
    }else{
        res.status(403).json({error: "Error ao criar adm"});
    }
});

// Rota protegida
router.get("/", valid.auth, (req, res) => {
    let users = createAdm.listAdm();
    res.json({ users: users });
});

module.exports = router;