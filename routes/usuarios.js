const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator'); //Inserta la funcion check desde validator
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');

const router = Router();

//router.get('/api', (req,res) => {   DE ESTA FORMA SE VEHIA EL CODIGO
//    res.jason({                     ANTES DE SEPARAR EL CONTROLADOR Y LAS RUTAS
//        msg:'get API'               EN LOS ARCHUVOS routes/usuarios y 
//    });                             controllers/usuarios
//});  abajo "usuariosGet referencia la funcion de flecha que esta en controllers/usuarios"
router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID Valido').isMongoId(), // Ademas del check la ult.funcion es propia para mongoDB
    check('id').custom(existeUsuarioPorId),    // funcion personaliz.(custom) del db-validators
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut);  // id para parametro de segmento / query 

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //nombre no vacio
    check('password', 'El password debe tener mas de 6 letras').isLength({min: 6}), //minimo 6 char
    check('correo', 'El correo no es valido').isEmail(), // Middleware que verifica el correo
    check('correo').custom(emailExiste),
    //check('rol').custom( rol() => esRoleValido(rol) ),// Esto es redundannte
    check('rol').custom(esRoleValido),   // cuando enviado y recibido son iguales se obvian
 
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID Valido').isMongoId(), // Ademas del check la ult.funcion es propia para mongoDB
    check('id').custom(existeUsuarioPorId),    // funcion personaliz.(custom) del db-validators
    validarCampos
], usuariosDelete );



module.exports = router;