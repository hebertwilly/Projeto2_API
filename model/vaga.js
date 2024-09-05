const mongoose = require('mongoose');

const vagaSchema = new mongoose.Schema({
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
          type: Schema.Types.ObjectId,
          ref: 'Usuario' // Refere-se ao modelo de Usuário
        }
      }],
      criador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', // Refere-se ao modelo de Usuário
        required: true
      },
      status: {
        type: String,
        enum: ['aberta', 'fechada'],
        default: 'aberta'
      },
      aprovado: {
        type: Boolean,
        default: false
      }
});

const Vaga = mongoose.model('Vaga', vagaSchema);

module.exports = Vaga;