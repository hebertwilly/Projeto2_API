const Abastecimento = require('../model/abastecimento');

async function createAbastecimento(abastecimento){
    try{
        const {idFrentista, idAbastecida, bico, combustivel, ppl, litros, total} = abastecimento
        const obj = {idFrentista, idAbastecida, bico, combustivel, ppl, litros, total}
        
        const newAbastecida = await Abastecimento.create(obj);
        console.log(newAbastecida);
        return newAbastecida;
    }catch (error){
        console.error("Erro ao salvar abastecida:", error);
        return null
    }
};

module.exports = createAbastecimento;

