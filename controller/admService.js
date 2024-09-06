const Adm = require('../model/adm');

async function createAdm(adm){
    try{
        const {nome,email} = adm
        const administrador = adm
        
        const newAdm = await Adm.create(administrador);
        console.log(newAdm);
        return newAdm;
    }catch (error){
        console.error("Erro ao criar administrador:", error);
        return null
    }
}

module.exports = createAdm;