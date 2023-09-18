const jwt = require('jsonwebtoken');  // Exporto el paquete de JWT

const generarJWT = ( uid = '' ) => {            // uid= Identificacion del usuario
    return new Promise(( resolve, reject) => {  // Genero la promesa que retornara el JWT
        const payload = { uid };        
        jwt.sign (payload, process.env.SECRETORPRIVATEKEY, {  // Firmo el token
            expiresIn: '4h'
        }, (err, token) =>{                         // Callback final
            if (err) {
                console.log(err);
                reject ('No se pudo generar el token')
            } else {
                resolve( token );                   // Retorna el token
            }
        })

    })
}

module.exports = {
    generarJWT
}