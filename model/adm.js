const mongoose = require('mongoose');

// Definindo o schema do usuário
const admSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true
    }
});

// Criando o modelo a partir do schema
const Adm = mongoose.model('Adm', admSchema);

module.exports = Adm;