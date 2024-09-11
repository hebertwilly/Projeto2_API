const Abastecimento = require('../model/abastecimento');
const {getFrentistaById} = require('../controller/frentistaService');

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
        const resultado = await Abastecimento.deleteOne({idAbastecida: id});
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

async function listAbastecidasByBico(bico){

    try{
        const abastecimentos = await Abastecimento.find({bico: bico});
        console.log(abastecimentos);
        const qtde = abastecimentos.length;
        
        console.log(qtde);
        return qtde;
    }catch(error){
        console.log("Nenhum abastecimento pra esse bico");

        return false;
    }
}

async function listAbastecidas(page){
    const limit = 5;

    try{
        const pageNumber = parseInt(page);
        const skip = (pageNumber - 1) * limit;

        const abastecimentos = await Abastecimento.find().skip(skip).limit(limit).populate('idFrentista').exec();
        console.log(abastecimentos);
        
        return abastecimentos;

    }catch(error){
        console.error(error);

        return false;
    }
}

async function getAbastecimentosForFrentista(email, page){
    const limit = 5;
    const frentista = await getFrentistaById(email);

    if(frentista === false){
        console.log("Frentista não encontrado");
    }else{
        try{
            const pageNumber = parseInt(page);
            const skip = (pageNumber - 1) * limit;

            const abastecimentos =  await Abastecimento.find({idFrentista: frentista._id})
            .skip(skip)
            .limit(limit)
            .populate('idFrentista')
            .exec();

            console.log(abastecimentos);

            return abastecimentos;
        }catch(error){
            console.log(error);

            return false;
        }
    }
}

async function updateAbastecida(id, novoFrentistaId) {
    try {
        const newAbastecida = await Abastecimento.findOneAndUpdate(
            { idAbastecida: id },
            { $set: { idFrentista: novoFrentistaId } }, 
            { new: true, runValidators: true }
        );

        if (!newAbastecida) {
            console.log('Abastecida não encontrada.');
            return false;
        }

        console.log('Abastecida atualizada com sucesso:', newAbastecida);
        return newAbastecida;
    } catch (error) {
        console.error('Erro ao atualizar abastecida:', error);
        return false;
    }
}

module.exports = {createAbastecimento, deleteAbastecida, listMyAbastecidas, listAbastecidas, getAbastecimentosForFrentista, updateAbastecida, listAbastecidasByBico};

