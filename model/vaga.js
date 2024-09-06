const mongoose = require('mongoose');

const vagaSchema = new mongoose.Schema({
      idVaga:{
        type: Number,
        required: true,
        unique: true
      },
      nome: {
        type: String,
        required: true
      },
      empresa: {
        type: String,
        required: true
      },
      descricao: {
        type: String,
        required: true
      },
      candidatos: [{
        idCandidato: {
          type: String,
          ref: 'User', // Refere-se ao modelo de Usuário
        }
      }],
});

const Vaga = mongoose.model('Vaga', vagaSchema);

module.exports = Vaga;