const mongoose = require('mongoose');

const candidaturaSchema = new mongoose.Schema({
    idVaga: {
        type: Schema.Types.ObjectId,
        ref: 'Vagas', // Refere-se ao modelo de Vaga
        required: true
    },
    idCandidato: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Refere-se ao modelo de Usuário
        required: true
    },
    status: {
        type: String,
        enum: ['analise', 'aceita', 'rejeitada'],
        default: 'analise'
    },
    data: {
        type: Date,
        default: Date.now
    }

})

const Candidatura = mongoose.model('Candidatura', candidaturaSchema);

module.exports = Candidatura;

