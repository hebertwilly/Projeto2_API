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
            return false;
        }
    }catch(erro){
        console.log(erro);

        return false;
    }
};

async function updateAdm(email, novosDados) {
    try {
      const admAtualizado = await Adm.findOneAndUpdate(
        { email: email }, 
        { $set: novosDados }, 
        { new: true, runValidators: true } 
      );
  
      if (!admAtualizado) {
        console.log('Usuário não encontrado.');
        return false; 
      }
  
      console.log('Usuário atualizado com sucesso:', admAtualizado);
      return admAtualizado; 
    } catch (erro) {
      console.error('Erro ao atualizar o usuário:', erro);
      return false;
    }
};

async function listAdms(page){
    const limit = 5;

    try{
        const pageNumber = parseInt(page);
        const skip = (pageNumber - 1) * limit;

        const adm = await Adm.find().skip(skip).limit(limit).exec();
        console.log(adm);
        
        if(adm){
            return adm;
        }else{
            console.log("Não possui administradores");
            return false;
        }

    }catch(error){
        console.error(error);

        return false;
    }
};


module.exports = {createAdm, deleteAdm, getAdmById, updateAdm, listAdms};