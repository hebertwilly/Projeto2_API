const jwt = require("jsonwebtoken");

module.exports = {
    valid: (req, res, next) =>{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        try {
            const decoded = jwt.verify(token, '123@!#');
            req.user = decoded; 
            next();
        } catch (err) {
            // Captura qualquer erro que ocorra durante a verificação do token
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado' }); // Erro específico para token expirado
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({ message: 'Token inválido' }); // Erro específico para token inválido
            } else {
                return res.status(500).json({ message: 'Erro interno do servidor' }); // Erro genérico
            }
        }
    }
}