const { Router } = require('express');
const { check } = require('express-validator'); //Inserta la funcion check desde validator
const {login, googleSignIn}   = require('../controllers/auth');  // Controlador de auth
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contrasena es obligatoria').not().isEmpty(),
    validarCampos
], login);    // llamo mi controller/auth que me devuelve el login

router.post('/google',[
    check('id_token','id_token de Google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;