const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

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
module.exports ={
    login
}