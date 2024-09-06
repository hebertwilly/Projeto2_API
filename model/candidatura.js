const mongoose = require('mongoose');

const candidaturaSchema = new mongoose.Schema({
    idCandidatura:{
        type: Number,
        unique: true,
        required: true
    },
    idVaga: {
        type: Number,
        ref: 'Vaga', // Refere-se ao modelo de Vaga
        required: true,
    },
    candidato: {
        type:  String,
        ref: 'User', // Refere-se ao modelo de Usuário
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }

})

const Candidatura = mongoose.model('Candidatura', candidaturaSchema);

module.exports = Candidatura;

