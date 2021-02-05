var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var RecetaSchema = new mongoose.Schema({
    name: String,
    descripcion: String
})

RecetaSchema.plugin(mongoosePaginate)
const Receta = mongoose.model('Receta', RecetaSchema)

module.exports = Receta;