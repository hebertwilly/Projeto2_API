const Candidatura = require('../model/candidatura');
const {getUserById} = require('../controller/userService');
const {getVagaById, populateCandidatos, deleteCandidato} = require('../controller/vagaService');

async function createCandidatura(candidatura) {
    try{
        const {idCandidatura, idVaga, candidato} = candidatura;
        const obj = {idCandidatura, idVaga, candidato};

        const usuario = await getUserById(obj.candidato);
        const vaga = await getVagaById(obj.idVaga);

        if(usuario.email == obj.candidato && vaga.idVaga == obj.idVaga){
            const newCandidatura = await Candidatura.create(obj);
            const populate = await populateCandidatos(obj.candidato, obj.idVaga);
            
            return newCandidatura;
        }
        
        return usuario;
    }catch(error){
        console.log(error);
        return null;
    }
};

async function deleteCandidatura(id){
    try{

        const candidatura = await getCandidaturaById(id);
        const removeCandidato = await deleteCandidato(candidatura.candidato, candidatura.idVaga);
        const resultado = await Candidatura.deleteOne({idCandidatura: id});
        
        if (resultado.deletedCount === 0 && removeCandidato !== true) {
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
};

async function getCandidaturaById(id) {
    try{
        const candidatura = await Candidatura.findOne({idCandidatura: id});

        if(candidatura){
            console.log("usuario encontrado");
            return candidatura;
        }else{
            console.log("Nenhuma candidatura encontrado com esse id");
            return null;
        }
    }catch(erro){
        console.log(erro);

        return null;
    }
};

async function listCandidaturas(email) {
    try {
     
      const candidaturas = await Candidatura.find({ candidato: email }).exec();

      if (candidaturas.length === 0) {
        console.log('Nenhuma candidatura encontrada para o email:', email);
        return null
      } else {
        console.log('Candidaturas encontradas:', candidaturas);
      }
  
      return candidaturas;
    } catch (error) {
      console.error('Erro ao listar candidaturas por email:', error);
      return null
    }
}
  

module.exports = {createCandidatura, deleteCandidatura, getCandidaturaById, listCandidaturas}