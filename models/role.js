const {Schema, model} = require('mongoose'); // Desestructuro el esquema y el modelo

const RoleSchema = Schema ({
    rol: {                  // Nombre del campo de la BD "roles"
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});
module.exports = model('Role', RoleSchema); // Exporto el modelo RolSchema que llamo 'Role'