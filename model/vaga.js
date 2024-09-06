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
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Usuario', // Refere-se ao modelo de Usuário
          unique: true
        }
      }],
});

const Vaga = mongoose.model('Vaga', vagaSchema);

module.exports = Vaga;