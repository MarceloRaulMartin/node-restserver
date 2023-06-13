const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN, {    // Variable con la url de la BD
            useNewUrlParser: true,                  // Estas configuraciones las exige
            useUnifiedTopology: true               // mongo al conectar
            //useCreateIndex: true,                   // Ver 
            //useFindAndModify: false
        })
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la base de datos');
    }
    console.log('Base de datos online');
}
module.exports = {
    dbConnection
}