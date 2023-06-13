const Role = require('../models/role');   // Exporto el modelo role para validar rol con BD 
const Usuario = require('../models/usuario');   // Exporto el modelo usuario para validar correo

const esRoleValido = async (rol='') => {      //El Custom recibe el rol del body.
    const existeRol = await Role.findOne({ rol });  // Busco un rol en la BD con el 
                                                    // esquema importado Role
    if ( !existeRol ){                // Si el rol no existe envio error
        throw new Error(`El rol ${ rol } no existe en la BD`)
    }
}

const emailExiste = async (correo='') => {
    const existeEmail = await Usuario.findOne({correo}); // Busca correo igual al enviado
    if (existeEmail){               // Si existe debo retornar el error
        throw new Error(`El correo ${correo} ya existe`);   
    }
}

const existeUsuarioPorId = async (id='') => {
    const existeUsuario = await Usuario.findById(id);  //funcion de mongo ?
    if (!existeUsuario){               // Si no existe debo retornar el error
        throw new Error(`El id ${id} no existe`);   
    }
}

module.exports ={
     esRoleValido,
     emailExiste,
     existeUsuarioPorId
}