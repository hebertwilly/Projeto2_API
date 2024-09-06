const express = require('express');
require("./config/mongodb");

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));

authentication = require('./routes/authenticationRoute');
app.use('/', authentication);

vagas = require('./routes/vagasRoute');
app.use('/', vagas);

candidaturas = require('./routes/candidaturasRoutes');
app.use('/',candidaturas);

app.listen(3000, ()=>{
    console.log("localhost/3000...");
});