const Contador = require("../model/contador");

async function geraId(nomeContador) {
    const contador = await Contador.findOneAndUpdate(
      { nome: nomeContador },
      { $inc: { valor: 1 } },
      { new: true, upsert: true }
    );
    return contador.valor;
}

module.exports = geraId

