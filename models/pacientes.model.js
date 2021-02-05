var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var PacienteSchema = new mongoose.Schema({
    
    name: String,
    apellido: String,
    email: String,
    password: String,
    fechaNac: String,
    nroDocumento: String,
    genero: String,
    direccion: String,
    rol: String,
    obraSocial: String,
    plan: String,
    afiliado: String,
    provincia: String,
    localidad: String,
    codPostal: String,
    nacionalidad: String,
    tipoDocumento: String,
    telefono: String,
    estado: String,
    habitosPersonales:{
        fumo: String,
        fuma: String,
        cuantoFuma: String,
        consumioAlcohol: String,
        consumeAlcohol: String,
        cuantoAlcohol: String,
        consumeDrogas: String,
        acupuntura: String,
        tatuajes: String       
    },
    antecedentesFamiliares:{
        diabetes: String,
        cancer: String,
        hipertension: String,
        cardiacos: String
    },
    antecedentesPersonales:{
        hospitalizado: String,
        tranfusiones: String,
        infecciones: String
    },
    enfermedades:{
        alergia: String,
        hepatitis: String,
        endocrinas: String,
        neurologico: String,
        diabetes: String,
        neumonia: String,
        osteoarticulares: String,
        dialisis: String,
        hemofilia: String,
        hipotension: String,
        psiquiatricos: String,
        sifilis: String,
        renal: String,
        hipertension: String,
        cardiacas: String,
        tuberculosis: String
    },
    consultas:[
        {
        consulta: String,
        diagnostico: String
        }
    ]
})

PacienteSchema.plugin(mongoosePaginate)
const Paciente = mongoose.model('Paciente', PacienteSchema)

module.exports = Paciente;