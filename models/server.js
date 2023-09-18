// AQUI DEFINO MI CLASE SERVER
//===============================
const express   = require('express');
const cors      = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT;
        this.usuariosPath = '/api/usuarios';     //Config. de ruta Endpoint de usuarios
        this.authPath = '/api/auth';             //Config. de ruta Endpoint de login

        // Conexion a base de datos
        this.conectarDB();
        
        //Middlewares   Se que es un middleware porque se usa con "use"
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){
        //CORS                      Gestiona la seguridad de mi aplicacion
        this.app.use(cors());
        //Lectura y parseo del Body
        this.app.use( express.json());  // config de que tipo de inf. llega por el body del BackEnd
        //Directorio Publico
        this.app.use(express.static('public')); 
    }

    routes(){
           this.app.use(this.authPath, require('../routes/auth'));   // Defino ruta para logun
           this.app.use(this.usuariosPath, require('../routes/usuarios')); // ruta para usuarios
     }

    listen(){
        this.app.listen(this.puerto, () => {
            console.log('Servidor corriendo en el puerto', this.puerto)
        });
    }

}

module.exports = Server;