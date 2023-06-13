const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    error = validationResult(req);
    if (!error.isEmpty()) {           // Si hay errores 
        return res.status(400).json(error); // Muestra los errores econtrados por express-validator
    }                               //el check del  express-validator en routes/usuarios.js
    next();
}

module.exports = {
    validarCampos
}