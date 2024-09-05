const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const createAdm = require('../model/adm');
const valid = require('../helpers/valid_auth');
const User = require('../model/user');

// Rota de login
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

// Rota de criação de conta
router.post("/criarConta", async (req, res) => {
    let { nome, email, senha } = req.body;
    let usuario = {nome, email, senha};

    const newUser = await User.create(usuario);
    console.log(newUser);
    
    res.json({res: "usuario criado", user: newUser});
});

// Rota protegida
router.get("/", valid.auth, (req, res) => {
    let users = createAdm.listAdm();
    res.json({ users: users });
});

module.exports = router;