// AQUI DEFINO Y EXPORTO COMO FUNCIONES TODAS MIS RUTAS
//=======================================================
const {response, request} = require('express'); //Esto es solo para pasar como parametro de la func.
                       // de flecha y que VisualStudioCode sepa de que se trata el callback
const bcryptjs = require('bcryptjs'); // Paquete para encriptar password
const Usuario = require("../models/usuario"); // Importo mi modelo, va con "U" mayusculas
                                // porque asi me permitira crear Instancias de mi modelo

const usuariosGet = async (req = request, res=response) => {
    const {limite=5, desde=0} = req.query;  // desestructuro limite/dsde que vienen en el request
    const query = {estado : true}
    
    const [total_usuarios, usuarios_bd] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query) // Trae toda la coleccion de la BD  
        .skip(Number(desde))  //Desde el registro que se inicia "desde"
        .limit(Number(limite))
    ])
    
    res.json({total_usuarios,
        usuarios_bd
    });
}
const usuariosPut = async(req, res=response) => {
    const id = req.params.id;       // id viene como parametro de segmento
                                    // configurado en routes/usuarios.js
    const { _id, password, google, correo, ... resto} = req.body; //desestructuro los datos que debo
                        // validar al actualizar
    // TODO validar contra la base de datos
    if (password) {     // si viene password es porque se quiere actualizar el mismo
        //Entonces tambien debo Encriptar la nueva contrasena
        const salt = bcryptjs.genSaltSync();    // Defino el "salt". Por defecto genSaltSync(10)
        resto.password = bcryptjs.hashSync(password, salt); // Encryptado del password
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}
const usuariosPost = async(req, res=response) => {

    const {nombre, correo, password, rol}= req.body;  // Info desestructurada del usuario desde el body
    const usuario = new Usuario({nombre, correo, password, rol});  //Envio a la Instancia del 
                                 // modelo Usuario, solo un {"Objeto"} con la info obligatoria
    // Verificar si correo existe
    // const existeEmail = await Usuario.findOne({correo}); // Busca correo igual al enviado
    // if (existeEmail){               // Si existe debo retornar el error
    //     return res.status(400).json({   // Devuelvo el bas request 400 y el mensaje
    //         msg: 'El correo ya esta registrado'  // mensaje
    //     });
    // }

    //Encriptar la contrasena
    const salt = bcryptjs.genSaltSync();    // Defino el "salt". Por defecto genSaltSync(10)
    usuario.password = bcryptjs.hashSync(password, salt); // Encryptado del password

    //Guardad en BD
    await usuario.save() //Ejecuta el grabado del modelo de usuario en la base de datos.

    res.status(201).json({                     // Aqui cambiamos status 200 por 201     
        usuario
    });
}
const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;
    //const usuario = await Usuario.findByIdAndDelete(id) // Borrado fisico
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false })
    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}   // DEBO EXPORTAR TODOS MIS RUTAS