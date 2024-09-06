const mongoose = require('mongoose');

// Definindo o schema do usuário
const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true  // Corrigido de 'require' para 'required'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
});

// Criando o modelo a partir do schema
const User = mongoose.model('User', userSchema);

module.exports = User;