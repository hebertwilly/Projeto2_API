const express = require('express');
require("./config/mongodb");

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));

authentication = require('./routes/authenticationRoute');
app.use('/', authentication);

abastecimentos = require('./routes/abastecimentosRoutes');
app.use('/', abastecimentos);

users = require('./routes/usersRouter');
app.use('/', users);

app.listen(3000, ()=>{
    console.log("localhost/3000...");
});