const mongoose = require('mongoose');


const frentistaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
    },
});

const Frentista = mongoose.model('Frentista', frentistaSchema);

module.exports = Frentista;