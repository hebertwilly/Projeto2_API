const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://hebertferreira15:Dmrrh97599017@cluster0.epb2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
)
.then(()=>console.log("Mongodb Connect..."))
    .catch(() => console.log("Erro ao conectar ao MongoDB"));
