const validarCampos  = require('../middlewares/validar-campos');
const validarJWT     = require('../middlewares/validar-jwt'); //Valida token
const validaRoles    = require('../middlewares/validar-roles'); //Valida Rol

module.exports = {
    ...validarCampos,    // Exporto todo lo que estas funciones devuelvan
    ...validarJWT,
    ...validaRoles
}