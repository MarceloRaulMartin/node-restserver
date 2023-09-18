const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }
    const { rol, nombre} = req.usuario; //Desestructuro rol y nombre de la request del usuario
    if ( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esta tarea`
        });
    }
    next();
}

const tieneRole = ( ... roles ) => {  // OPERADOR REST ...
 
    return ( req, res=response, next) => {    // Retorno esta funcion a routes/usuario
        if (!roles.includes (req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}