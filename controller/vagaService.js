const Vaga = require('../model/vaga');

async function createVaga(vaga){
    try{
        const {idVaga, nome, empresa, descricao} = vaga;
        const obj = {idVaga, nome, empresa, descricao};

        const newVaga = await Vaga.create(obj);
        console.log(newVaga);

        return newVaga;
    }catch(error){
        console.log(error);
        return null;
    }
}

async function deleteVaga(id){
    try{
        const resultado = await Vaga.deleteOne({idVaga: id});
        if (resultado.deletedCount === 0) {
            console.log('Nenhum documento encontrado com esse idVaga.');
            
            return false;
        }else {
            console.log('Documento deletado com sucesso.');
            
            return true;
        }
    }catch(erro){
        console.log("ERRO AO DELETAR");

        return false;
    }
}

async function getVagaById(id){
    try{
        const vaga = await Vaga.findOne({idVaga: id});

        if(vaga){
            console.log("usuario encontrado");
            return vaga;
        }else{
            console.log("Nenhum usuário encontrado com esse id");
            return null;
        }
    }catch(erro){
        console.log(erro);

        return null;
    }
}

async function populateCandidatos(email, id){
    try{

        const populate = await Vaga.findOneAndUpdate(
            {idVaga: id},
            {$push: {candidatos: {idCandidato: email}}},
            {new: true, runValidators: true}
        )

        if(!populate){
            throw new Error('Vaga Não encontrada');
        }

        console.log(populate);
        return true;
    }catch(error){
        console.error('Erro ao adicionar candidato:', error);
        throw error; // Propaga o erro
    }
}

async function deleteCandidato(email, id){
    try{
        const resultado = await Vaga.updateOne(
            {idVaga: id},
            {$pull:{candidatos:{idCandidato: email}}},
        );

        if (resultado.nModified === 0) {
            console.log("Nenhum Candidato encontrado");
            return false;
        }

        return true;
    }catch (error) {
        console.error('Erro ao remover candidato:', error);
        throw error; // Propaga o erro
    }
}

module.exports = {createVaga, deleteVaga, getVagaById, populateCandidatos, deleteCandidato};