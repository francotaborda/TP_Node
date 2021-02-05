var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var TurnosSchema = new mongoose.Schema({
    dia: String,
    horaInicio: String,
    jornadaLaboral: Int16Array,
    duracionTurno: Int16Array,
    medico: String,

})

TurnosSchema.plugin(mongoosePaginate)
const Turno = mongoose.model('Turno', TurnosSchema)

module.exports = Turno;