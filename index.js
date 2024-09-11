const express = require('express');
require("./config/mongodb");

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));

authentication = require('./routes/authenticationRoute');
app.use('/', authentication);

app.listen(3000, ()=>{
    console.log("localhost/3000...");
});