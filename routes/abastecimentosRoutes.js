const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const valid = require('../helpers/valid_auth');
const contador = require('../helpers/contador');

const {createAbastecimento, deleteAbastecida, listMyAbastecidas, listAbastecidas, getAbastecimentosForFrentista, updateAbastecida} = require('../controller/abastecimentoService');
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
});

router.get('/abastecimentos', async(req, res)=>{
    const {page = 1} = req.query;

    const abastecidas = await listAbastecidas(page);

    if(abastecidas === false){
        console.log("Nenhum abastecimento feito");
        res.json({mensagem: "Não foi realizado nenhum abastecimento"});
    }else{
        console.log("Abastecimentos encontrados:");
        res.json({abastecimentos: abastecidas});
    }
})

router.get('/abastecidasfor/:email', async(req, res)=>{
    const {page = 1} = req.query;
    const email = req.params.email

    const abastecidas = await getAbastecimentosForFrentista(email, page);

    if(abastecidas === false){
        console.log("Nenhum abastecimento encontrado para esse frentista");
        res.json({res: "Esse frentista ainda não efetuou abastecimentos"});
    }else{
        console.log("Abastecimentos encontrados:");
        res.json({abastecimentos: abastecidas});
    }
});

router.delete('/removeAbastecida/:id', async (req, res)=>{
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID com formato inválido.' });
    }

    const result = await deleteAbastecida(id);

    if(result === false){
        console.log("Abastecida não encontrada");
        res.json({err: "Não foi encontrado nenhuma abastecida com esse id"});
    }else{
        console.log("Abastecida removida");
        res.json({mensagem:"Abastecida estornada com sucesso"});
    }
});

router.put('/trocarFrentista/:id', async (req, res)=>{
    const idAbastecida = parseInt(req.params.id);
    const { novoFrentista } = req.body;

    const frentista = await getFrentistaById(novoFrentista)

    if(frentista === false){
        console.log("usuario não encontrado");
        res.json({erro: "É necessário que esse frentista tenha um login criado"});
    }else{
        const abastecida = await updateAbastecida(idAbastecida, frentista._id);
        console.log(frentista._id, abastecida);

        if(abastecida === false){
            console.log("Nenhuma abastecida existe com esse id");
            res.json({error: "essa abastecida não existe"});
        }else{
            res.json({mensagem: "Frentista da Abastecida trocado com sucesso", abastecida: abastecida});
        }
       
    }
});


module.exports = router;