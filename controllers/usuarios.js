// AQUI DEFINO Y EXPORTO COMO FUNCIONES TODAS MIS RUTAS
//=======================================================
const {response, request} = require('express'); //Esto es solo para pasar como parametro de la func.
                       // de flecha y que VisualStudioCode sepa de que se trata el callback

const usuariosGet = (req = request, res=response) => {
    const {q, nombre = 'no name', apikey}= req.query;  //Recibe los query del URL

    res.json({     
        msg:'get API - controlador',
        q,
        nombre,
        apikey
    });
}
const usuariosPut = (req, res=response) => {
    const id = req.params.id;       // id viene como parametro de segmento
                                    // configurado en routes/usuarios.js
    res.json({     
        msg:'put API - controlador',
        id
    });
}
const usuariosPost = (req, res=response) => {
    const {nombre, edad} = req.body;              // Info que llega del usuario en el body
    res.status(201).json({              // Aqui cambiamos status 200 por 201     
        msg:'post API - controlador x',
        nombre,
        edad
    });
}
const usuariosDelete = (req, res=response) => {
    res.json({     
        msg:'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}   // DEBO EXPORTAR TODOS MIS RUTAS