const express = require('express');
const Adm = require('../model/adm');
const User = require('../model/user');
const Vaga = require('../model/vaga');
const Candidatura = require('../model/candidatura');
const geraId = require('../helpers/contador'); 
const { createAdm } = require('../controller/admService');
const router = express.Router();

router.get('/install', async (req, res) => {
  try {
    
    const adminsCount = await Adm.countDocuments({});
    if (adminsCount > 0) {
      return res.status(400).json({ message: 'Já existem administradores na coleção.' });
    }

   
    const admin = { email: 'admin@admin.com', senha: '1234' };
    const novoAdmin = await createAdm(admin);
    if (!novoAdmin) {
      return res.status(500).json({ message: 'Erro ao criar usuário administrador.' });
    }


    const users = [
      { nome: 'User1', email: 'user1@example.com', senha: 'senha123' },
      { nome: 'User2', email: 'user2@example.com', senha: 'senha123' },
      { nome: 'User3', email: 'user3@example.com', senha: 'senha123' },
      { nome: 'User4', email: 'user4@example.com', senha: 'senha123' },
      { nome: 'User5', email: 'user5@example.com', senha: 'senha123' }
    ];
    await User.insertMany(users);


    const vagas = [
      { idVaga: await geraId('vagaId'), nome: 'Vaga1', empresa: 'Empresa1', descricao: 'Descrição da Vaga 1' },
      { idVaga: await geraId('vagaId'), nome: 'Vaga2', empresa: 'Empresa2', descricao: 'Descrição da Vaga 2' },
      { idVaga: await geraId('vagaId'), nome: 'Vaga3', empresa: 'Empresa3', descricao: 'Descrição da Vaga 3' },
      { idVaga: await geraId('vagaId'), nome: 'Vaga4', empresa: 'Empresa4', descricao: 'Descrição da Vaga 4' },
      { idVaga: await geraId('vagaId'), nome: 'Vaga5', empresa: 'Empresa5', descricao: 'Descrição da Vaga 5' }
    ];
    await Vaga.insertMany(vagas);

    res.status(201).json({ message: 'Banco de dados instalado e populado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao instalar e popular o banco de dados.', error });
  }
});

module.exports = router;