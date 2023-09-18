// Este es mi middleare para progejer/ validar la ruta
const { response, request } = require('express');  // Se exporta automaticamnte para usar la response
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');  // importo el modelo para interaccion con bd


const validarJWT = async ( req = request, resp =response, next ) => {
    const token = req.header('x-token');  // Pido de mi request el valor de x-token
    if (!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); //Verifica el token y extrae el uid
        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);  // Busqueda de Mongo
        // Verificar si el uid existe
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe en bd'
            })
        }
        // Verificar si el uid tiene estado .t. (no borrado)
            if (!usuario.estado) {
                return res.status(401).json({
                msg: 'Token no valido - Usuario estado: false'
            })
        }
        req.usuario = usuario;
        next();

    } catch (error){
        console.log(error);
        resp.status(401).json({
            msg: 'Token invalido..'
        })
    }

    }

module.exports = {
    validarJWT
}