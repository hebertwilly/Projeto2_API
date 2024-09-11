const Frentista = require('../model/frentista');

async function createFrentista(frentista){
    try{
        const {nome,email,senha} = frentista
        const obj = {nome,email,senha}
        
        const newFrentista = await Frentista.create(obj);
        console.log(newFrentista);

        return newFrentista;
    }catch (error){
        console.error("Erro ao criar administrador:", error);
        return null
    }
}

async function deleteFrentista(email){
    try{
        const resultado = await Frentista.deleteOne({email: email});
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

async function getFrentistaById(email){
    try{
        const frentista = await Frentista.findOne({email: email});

        if(frentista){
            console.log("usuario encontrado");
            return frentista;
        }else{
            console.log("Nenhum usuário encontrado com esse id");
            return null;
        }
    }catch(erro){
        console.log(erro);

        return null;
    }
};

async function updateFrentista(email, novosDados) {
    try {
      const frentistaAtualizado = await Adm.findOneAndUpdate(
        { email: email }, 
        { $set: novosDados }, 
        { new: true, runValidators: true } 
      );
  
      if (!frentistaAtualizado) {
        console.log('Usuário não encontrado.');
        return null; 
      }
  
      console.log('Usuário atualizado com sucesso:', frentistaAtualizado);
      return frentistaAtualizado; 
    } catch (erro) {
      console.error('Erro ao atualizar o usuário:', erro);
      throw erro; 
    }
  }

  module.exports = {createFrentista, deleteFrentista, getFrentistaById, updateFrentista}