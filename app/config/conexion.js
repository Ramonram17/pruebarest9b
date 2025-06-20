const mongoose = require('mongoose') 
const config = require('./configuracion')

module.exports={
    connection : null,
    connect : ()=>{
        if(this.connection) return this.connection
        return mongoose.connect(config.DB)
        .then(conn =>{
            this.connection = conn
            console.log('la conexión se realizó de manera correcta');

        })
        .catch(e =>{console.log('Error en la conexión', e)})
    }
}