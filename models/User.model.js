var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    name: String,
    apellido: String,
    email: String,
    password: String,
    fechaNac: String,
    nroDocumento: String,
    genero: String,
    direccion: String,
    rol: String,
    provincia: String,
    localidad: String,
    codPostal: String,
    pais: String,
    tipoDocumento: String,
    telefono: String,
    estado: String
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;