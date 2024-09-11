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
        return false
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
            return false;
        }
    }catch(erro){
        console.log(erro);

        return false;
    }
};

async function updateFrentista(email, novosDados) {
    try {
      const frentistaAtualizado = await Frentista.findOneAndUpdate(
        { email: email }, 
        { $set: novosDados }, 
        { new: true, runValidators: true } 
      );
  
      if (!frentistaAtualizado) {
        console.log('Usuário não encontrado.');
        return false; 
      }
  
      console.log('Usuário atualizado com sucesso:', frentistaAtualizado);
      return frentistaAtualizado;

    } catch (erro) {
      console.error('Erro ao atualizar o usuário:', erro);
      return false
    }
};

async function listFrentistas(page){
    const limit = 5;

    try{
        const pageNumber = parseInt(page);
        const skip = (pageNumber - 1) * limit;

        const frentistas = await Frentista.find().skip(skip).limit(limit).exec();
        console.log(frentistas);
        
        if(frentistas){
            return frentistas;
        }else{
            console.log("Não possui frentistas");
            return false;
        }

    }catch(error){
        console.error(error);

        return false;
    }
};

  module.exports = {createFrentista, deleteFrentista, getFrentistaById, updateFrentista, listFrentistas}