const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

authentication = require('./routes/authentication');
app.use('/', authentication);




app.listen(3000, ()=>{
    console.log("localhost/3000...");
});