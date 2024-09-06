const express = require('express');
require("./config/mongodb");

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));

authentication = require('./routes/authentication');
app.use('/', authentication);

vagas = require('./routes/vagas');
app.use('/', vagas);


app.listen(3000, ()=>{
    console.log("localhost/3000...");
});