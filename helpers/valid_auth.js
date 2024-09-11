const jwt = require("jsonwebtoken");

module.exports = {
    auth: (req, res, next) => {
        let bearToken = req.headers['authorization'];

        // Verificação se o token está presente
        if (!bearToken) {
            return res.status(401).json({ mensagem: "Token não fornecido" });
        }

        let tokenParts = bearToken.split(" ");
        
        // Verificação do formato do token
        if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
            return res.status(400).json({ mensagem: "Formato de token inválido" });
        }

        let token = tokenParts[1];

        jwt.verify(token, '123@!#', (err, decoded) => {
            if (err) {
                res.status(403).json({ mensagem: "Token inválido" });
            } else {
                req.email = decoded.email;
                req._id = decoded._id;
                next();
            }
        });
    }
}