const Vaga = require('../model/vaga');

async function createVaga(vaga){
    try{
        const newVaga = await Vaga.create(vaga);
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

module.exports = {createVaga, deleteVaga, getVagaById};