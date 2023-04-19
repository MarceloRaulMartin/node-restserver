// AQUI DEFINO MI CLASE SERVER
//===============================
const express   = require('express');
const cors      = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT || 3000;   // Si la variable no existe le asigna puerto 3000
        this.usuariosPath = '/api/usuarios';     //Config. del Endpoint de usuarios

        //Middlewares   Se que es un middleware porque se usa con "use"
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
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
           // this.app.use('/api/usuarios', require('../routes/user'));
            this.app.use(this.usuariosPath, require('../routes/usuarios'));
     }

    listen(){
        this.app.listen(this.puerto, () => {
            console.log('Servidor corriendo en el puerto', this.puerto)
        });
    }

}

module.exports = Server;
