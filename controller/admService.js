const Adm = require('../model/adm');

async function createAdm(adm){
    try{
        const {email,senha} = adm
        const administrador = {email, senha}
        
        const newAdm = await Adm.create(administrador);
        console.log(newAdm);
        return newAdm;
    }catch (error){
        console.error("Erro ao criar administrador:", error);
        return null
    }
}

async function deleteAdm(email){
    try{
        const resultado = await Adm.deleteOne({email: email});
        if (resultado.deletedCount === 0) {
            console.log('Nenhum usuario encontrado com esse email.');
            
            return false;
        }else {
            console.log('Usuario deletado com sucesso.');
            
            return true;
        }
    }catch(erro){
        console.log("ERRO AO DELETAR");

        return false;
    }
}

async function getAdmById(email){
    try{
        const adm = await Adm.findOne({email: email});

        if(adm){
            console.log("usuario encontrado");
            return adm;
        }else{
            console.log("Nenhum usuário encontrado com esse id");
            return null;
        }
    }catch(erro){
        console.log(erro);

        return null;
    }
}

module.exports = {createAdm, deleteAdm, getAdmById};