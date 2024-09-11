const mongoose = require('mongoose');

const abastecimentoSchema = new mongoose.Schema({
      idFrentista:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Frentista',
        required: true,
      },
      idAbastecida:{
        type: Number,
        required: true,
        unique: true,
      },
      bico: {
        type: Number,
        required: true
      },
      combustivel: {
        type: String,
        required: true
      },
      ppl: {
        type: Number,
        required: true
      },
      litros: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      }
});

const Abastecimento = mongoose.model('Abastecimento', abastecimentoSchema);

module.exports = Abastecimento;