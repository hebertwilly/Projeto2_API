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

async function deleteAbastecida(id){
    try{
        const resultado = await Abastecida.deleteOne({idAbastecida: id});
        if (resultado.deletedCount === 0) {
            console.log('Nenhuma abastecida encontrada com esse id');
            
            return false;
        }else {
            console.log('Abastecida deletada com sucesso');
            
            return true;
        }
    }catch(erro){
        console.log("ERRO AO DELETAR");

        return false;
    }
}

async function listMyAbastecidas(_id, page){
    const limit = 5;

    try{
        const pageNumber = parseInt(page);
        const skip = (pageNumber - 1) * limit;

        const abastecimentos = await Abastecimento.find({idFrentista: _id}).skip(skip).limit(limit).exec();
        console.log(abastecimentos);
        
        return abastecimentos;

    }catch(error){
        console.error(error);

        return false;
    }
};

module.exports = {createAbastecimento, deleteAbastecida, listMyAbastecidas};

