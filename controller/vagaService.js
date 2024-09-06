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

module.exports = createVaga;