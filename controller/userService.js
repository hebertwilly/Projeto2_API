const User = require('../model/user');

async function createUser(user){
    try{
        const {nome, email, senha} = user;
        const usuario = user;

        const newUser = await User.create(usuario);
        console.log(newUser);
        return newUser;
    }catch (error){
        console.error("Erro ao criar usuário:", error);
        return null
    }
}

async function deleteConta(email){
    try{
        const resultado = await User.deleteOne({email: email});
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

async function getUserById(email){
    try{
        const user = await User.findOne({email: email});

        if(user){
            console.log("usuario encontrado");
            return user;
        }else{
            console.log("Nenhum usuário encontrado com esse id");
            return null;
        }
    }catch(erro){
        console.log(erro);

        return null;
    }
}

module.exports = {createUser, deleteConta, getUserById};