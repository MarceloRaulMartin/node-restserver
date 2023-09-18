// Definicion del modelo para filtrar y grabar base de datos de usuarios
const { Schema, model } = require('mongoose'); // Extraigo 2 propiedades de monggose, 
// Schema es para definir la coleccion, model para exportarla

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required:[true, 'El nombre es obligatorio'],  //Obligatorio, y mensaje de error
    },
    correo: {
        type: String,
        required:[true, 'El correo es obligatorio'],  //Obligatorio, y mensaje de error
        unique: true                            //No permite correos duplicados
    },
    password: {
        type: String,
        required:[true, 'Clave obligatoria'],  //Obligatorio, y mensaje de error
    },
    Img: {              // Es un url donde manejo la imagen del usuario
        type: String
    },
    rol: {
        type: String,
        required:true
        //enum: ['ADMIN_ROLE','USER_ROLE']    //Coleccion permitidas (puede ser una BD)
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

})

UsuarioSchema.methods.toJSON = function () {  //Para modificar el JSON recibido debe ser funcion normal
                                              //para poder usar el "this"
    const {__v, password, _id, ...restodatos} = this.toObject(); //desestructuro toObjet() que retornar una instancia con los datos recibidos
                                                              //"..." ejecuta el rest de los datos a la variable "restodatos"
    restodatos.uid = _id;
    return restodatos   // retorno todos los datos excepto "__v" y "pasword"
}

module.exports = model('Usuario', UsuarioSchema)  
// Exporto la funcion model que requiere el nombre de la coleccion y el Esquema