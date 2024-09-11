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



module.exports = {createAbastecimento, deleteAbastecida};

