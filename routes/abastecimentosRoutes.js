const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const valid = require('../helpers/valid_auth');
const contador = require('../helpers/contador');

const createAbastecimento = require('../controller/abastecimentoService');

router.post("/abastecida", async (req, res) =>{
    let {idFrentista, bico, combustivel, ppl, litros} = req.body;

    let pplFloat = parseFloat(ppl);
    let litrosFloat = parseFloat(litros);

    const total = pplFloat * litrosFloat;

    const id = await contador('Abastecida');

    const abastecida = {idFrentista, idAbastecida: id, bico, combustivel, ppl, litros, total: total};

    const newAbastecida = await createAbastecimento(abastecida);

    if(newAbastecida !== null){
        console.log("Abastecida salva com sucesso");
        res.json({abastecida: newAbastecida, res: "Salvo Com Sucesso"});
    }else{
        console.log("retorno null do create");
        res.status(403).json({error: "Não foi possível salvar esse abastecimento"});
    }

});

module.exports = router;