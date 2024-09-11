const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const valid = require('../helpers/valid_auth');
const contador = require('../helpers/contador');

const {createAbastecimento, deleteAbastecida} = require('../controller/abastecimentoService');
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
    

    if(valid !== null){
        const newAbastecida = await createAbastecimento(abastecida);
        if(newAbastecida !== null){
            console.log("Abastecida salva com sucesso", emailFrentista);
            res.json({abastecida: newAbastecida, res: "Salvo Com Sucesso", frentista: emailFrentista});
        }else{
            console.log("retorno null do create");
            res.status(403).json({error: "Não foi possível salvar esse abastecimento"});
        }
    }else{
        console.log("apenas frentistas podem salvar abastecimentos");
        res.json({res: "usuario não tem permissão para salvar abastecida"});
    }

});



module.exports = router;