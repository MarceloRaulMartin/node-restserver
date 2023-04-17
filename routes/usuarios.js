const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

//router.get('/api', (req,res) => {   DE ESTA FORMA SE VEHIA EL CODIGO
//    res.jason({                     ANTES DE SEPARAR EL CONTROLADOR Y LAS RUTAS
//        msg:'get API'               EN LOS ARCHUVOS routes/usuarios y 
//    });                             controllers/usuarios
//});  abajo "usuariosGet referencia la funcion de flecha que esta en controllers/usuarios"
router.get('/', usuariosGet);

router.put('/:id', usuariosPut);  // id para parametro de segmento / query 

router.post('/', usuariosPost);

router.delete('/', usuariosDelete );



module.exports = router;