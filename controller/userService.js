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

module.exports = createUser;