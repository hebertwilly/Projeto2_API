const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const valid = require('../helpers/valid_auth');
const contador = require('../helpers/contador');

const {createAbastecimento, deleteAbastecida, listMyAbastecidas} = require('../controller/abastecimentoService');
const { getFrentistaById } = require('../controller/frentistaService');

router.post("/abastecida",valid.auth,  async (req, res) =>{
    let {bico, combustivel, ppl, litros} = req.body;
    const frentista = req._id;
    const emailFrentista = req.email
    const id = await contador('Abastecida');

    let pplFloat = parseFloat(ppl);
    let litrosFloat = parseFloat(litros);
    const total = pplFloat * litrosFloat;

    const abastecida = {idFrentista: frentista, idAbastecida: id, bico, combustivel, ppl, litros, total: total};
    
    const valid = await getFrentistaById(emailFrentista);
    

    if(valid === false){
        console.log("apenas frentistas podem salvar abastecimentos");
        res.json({res: "usuario não tem permissão para salvar abastecida"});
    }else{
        const newAbastecida = await createAbastecimento(abastecida);
        if(newAbastecida === false){
            console.log("retorno null do create");
            res.status(403).json({error: "Não foi possível salvar esse abastecimento"});
        }else{
            console.log("Abastecida salva com sucesso", emailFrentista);
            res.json({abastecida: newAbastecida, res: "Salvo Com Sucesso", frentista: emailFrentista});
        }
    }

});

router.get('/minhasAbastecidas', valid.auth, async (req, res)=>{
    const _id = req._id;
    const {page = 1} = req.query;

    const abastecidas = await listMyAbastecidas(_id, page);

    if(abastecidas === false){
        console.log("Você não possui Abastecidas");
        res.json({mensagem: "Você ainda não fez abastecimentos"});
    }else{
        console.log("Abastecidas listadas com sucesso");
        res.json({abastecimentos: abastecidas});
    }
})

module.exports = router;