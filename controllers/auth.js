const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
    const {correo, password} = req.body;

    try {
        // Verificar si correo existe
        const usuario = await Usuario.findOne({correo}); //Busca un usuario por su correop
        if (!usuario) {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            });
        }

        // Verificar si usurio esta activo
        if (!usuario.estado) {   //es lo mismo que prevuntar usuario.estado===false
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Estado=false'
            });
        }

        // Verificar contrasena valida
        const validPassword = bcryptjs.compareSync(password, usuario.password)
                // compareSync funcion de bcryptjs que comprar clave con firma
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Password'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id)
        res.json ({
            usuario,
            token
        })



        res.json ({
            msg: 'Login ok'
        })


    }  catch (error) {
        console.log (error) 
        return res.status(500).json({
                msg:'Hable con el administrador'
            });
    }
}

const googleSignIn = async( req, res = response) => {
    const { id_token } = req.body;
    try {
        const { correo, nombre, img} = await googleVerify( id_token); // Extraigo las variables que necesito
        let usuario = await Usuario.findOne({correo}); //Verifico en BD si existe correo
        if (!usuario){          // Resultado de findOne el usuario no existe
            //Tengo que crearlo 
            const data = {      // Preparo la data
                nombre,         // Uso el nombre de googleVerify
                correo,         // Uso el correo de googleVerify
                password: ':P',   // Asigno un pasword generico porque me obliga la BD
                img,            // Uso la img de googleVerify
                rol: 'USER_ROLE',
                google: true    
            };
            usuario = new Usuario(data); //Creo nuevo usuario
            await usuario.save();        //Grabo usuario en BD

        }
        //Validaciones del usuario encontrado
        if (!usuario.estado) {                  // Usuario Bloqueado
            return res.status(401).json({
                msg: 'Hable con el administrador usuario bloqueado'
            });
        };
        // Generar el JsonWebToken JWT
        const token = await generarJWT(usuario.id)
    
        res.json ({
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Token de google es invalido'
        })
    }

}

module.exports ={
    login,
    googleSignIn
}