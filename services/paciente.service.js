// Gettign the Newly created Mongoose Model we just created 
const Paciente = require('../models/pacientes.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { getMaxListeners } = require('../models/pacientes.model');
const mail = require("../services/mail.service")


// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getPacientes = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Pacientes = await Paciente.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Pacientes;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Pacientes');
    }
}

exports.createPaciente = async function (paciente) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(paciente.password, 8);
    var newPaciente = new Paciente({
        name: paciente.name,
        apellido: paciente.apellido,
        email: paciente.email,
        password: hashedPassword,
        fechaNac: paciente.fechaNac,
        nroDocumento: paciente.nroDocumento,
        genero: paciente.genero,
        direccion: paciente.direccion,
        rol: "Paciente",
        obraSocial: paciente.obraSocial,
        plan: paciente.plan,
        afiliado: paciente.afiliado,
        provincia: paciente.provincia,
        localidad: paciente.localidad,
        codPostal: paciente.codPostal,
        nacionalidad: paciente.nacionalidad,
        tipoDocumento: paciente.tipoDocumento,
        telefono: paciente.telefono,
        estado:"activo",
        habitosPersonales:{
            fumo: '',
            fuma: '',
            cuantoFuma: '',
            consumioAlcohol: '',
            consumeAlcohol: '',
            cuantoAlcohol: '',
            consumeDrogas: '',
            acupuntura: '',
            tatuajes: ''       
        },
        antecedentesFamiliares:{
            diabetes: '',
            cancer: '',
            hipertension: '',
            cardiacos: ''
        },
        antecedentesPersonales:{
            hospitalizado: '',
            tranfusiones: '',
            infecciones: ''
        },
        enfermedades:{
            alergia: '',
            hepatitis: '',
            endocrinas: '',
            neurologico: '',
            diabetes: '',
            neumonia: '',
            osteoarticulares: '',
            dialisis: '',
            hemofilia: '',
            hipotension: '',
            psiquiatricos: '',
            sifilis: '',
            renal: '',
            hipertension: '',
            cardiacas: '',
            tuberculosis: ''
        },
        consultas:[
            {
            consulta: '',
            diagnostico: ''
            }
        ]
    })

    try {
        // Saving the Paciente 
        var savedPaciente = await newPaciente.save();
        var token = jwt.sign({
            id: savedPaciente._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        var mailOptions = {
            from: 'uademedicalgroup@gmail.com',
            to: paciente.email,
            subject: 'UADE MEDICAL GROUP',
            text: 'Bienvenido ' + paciente.name + " ya podes acceder a nuestro portal y solicitar turnos con los mejores profesionales."
        };
        mail.sendEmail(mailOptions);
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Paciente")
    }
}

exports.resetPassword = async function (paciente) {
    // Creating a new Mongoose Object by using the new keyword

    try {
        //Find the old User Object by the Id
        var newPassPaciente = await Paciente.findOne({
            nroDocumento: paciente.dni
        })
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!newPassPaciente) { 
        return false;
    }
    
    var hashedPassword = bcrypt.hashSync(paciente.password, 8);
    newPassPaciente.password = hashedPassword;
   
    var mailOptions = {
        from: 'uademedicalgroup@gmail.com',
        to: newPassPaciente.email,
        subject: 'UADE MEDICAL GROUP',
        text: 'Estimado ' + newPassPaciente.name + " se a restablecido su password de acceso al portal."
    };
    mail.sendEmail(mailOptions);

    try {
        var savedPaciente = await newPassPaciente.save()
        return savedPaciente;
        
    } catch (e) {
        throw Error("And Error occured while updating the Password");
    }

}

exports.updateAntecedentesPaciente = async function (paciente) {
    
    try {
        //Find the old User Object by the Id
        var oldAntecedentes = await Paciente.findOne({
            nroDocumento: paciente.nroDocumento
        })
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldAntecedentes) { 
        return false;
    }
    //Edit the User Object

    oldAntecedentes.habitosPersonales.fumo = paciente.habitosPersonales.fumo,
    oldAntecedentes.habitosPersonales.fuma = paciente.habitosPersonales.fuma,
    oldAntecedentes.habitosPersonales.cuantoFuma = paciente.habitosPersonales.cuantoFuma,
    oldAntecedentes.habitosPersonales.consumioAlcohol = paciente.habitosPersonales.consumioAlcohol,
    oldAntecedentes.habitosPersonales.consumeAlcohol = paciente.habitosPersonales.consumeAlcohol,
    oldAntecedentes.habitosPersonales.cuantoAlcohol = paciente.habitosPersonales.cuantoAlcohol,
    oldAntecedentes.habitosPersonales.consumeDrogas = paciente.habitosPersonales.consumeDrogas,
    oldAntecedentes.habitosPersonales.acupuntura = paciente.habitosPersonales.acupuntura,
    oldAntecedentes.habitosPersonales.tatuajes = paciente.habitosPersonales.tatuajes,
    
    oldAntecedentes.antecedentesFamiliares.diabetes = paciente.antecedentesFamiliares.diabetes,
    oldAntecedentes.antecedentesFamiliares.cancer = paciente.antecedentesFamiliares.cancer,
    oldAntecedentes.antecedentesFamiliares.hipertension = paciente.antecedentesFamiliares.hipertension,
    oldAntecedentes.antecedentesFamiliares.cardiacos = paciente.antecedentesFamiliares.cardiacos,
   
    oldAntecedentes.antecedentesPersonales.hospitalizado = paciente.antecedentesPersonales.hospitalizado,
    oldAntecedentes.antecedentesPersonales.tranfusiones = paciente.antecedentesPersonales.tranfusiones,
    oldAntecedentes.antecedentesPersonales.infecciones = paciente.antecedentesPersonales.infecciones,
        
    oldAntecedentes.enfermedades.alergia = paciente.enfermedades.alergia,
    oldAntecedentes.enfermedades.hepatitis = paciente.enfermedades.hepatitis,
    oldAntecedentes.enfermedades.endocrinas = paciente.enfermedades.endocrinas,
    oldAntecedentes.enfermedades.neurologico = paciente.enfermedades.neurologico,
    oldAntecedentes.enfermedades.diabetes = paciente.enfermedades.diabetes,
    oldAntecedentes.enfermedades.neumonia = paciente.enfermedades.neumonia,
    oldAntecedentes.enfermedades.osteoarticulares = paciente.enfermedades.osteoarticulares,
    oldAntecedentes.enfermedades.dialisis = paciente.enfermedades.dialisis,
    oldAntecedentes.enfermedades.hemofilia = paciente.enfermedades.hemofilia,
    oldAntecedentes.enfermedades.hipotension = paciente.enfermedades.hipotension,
    oldAntecedentes.enfermedades.psiquiatricos = paciente.enfermedades.psiquiatricos,
    oldAntecedentes.enfermedades.sifilis = paciente.enfermedades.sifilis,
    oldAntecedentes.enfermedades.enal = paciente.enfermedades.renal,
    oldAntecedentes.enfermedades.hipertension = paciente.enfermedades.hipertension,
    oldAntecedentes.enfermedades.cardiacas = paciente.enfermedades.cardiacas,
    oldAntecedentes.enfermedades.uberculosis = paciente.enfermedades.tuberculosis

    try {
        var savedPaciente = await oldAntecedentes.save()
        return savedPaciente;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.nuevaConsulta = async function (paciente) {
    
    try {
        //Find the old User Object by the Id
        var newConsultaPaciente = await Paciente.findOne({
            nroDocumento: paciente.nroDocumento
        })
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }

    newConsultaPaciente.consultas.push({'consulta': paciente.consultas.consulta, 'diagnostico': paciente.consultas.diagnostico})

    
    try {
        var savedPaciente = await newConsultaPaciente.save()
        return savedPaciente;
    } catch (e) {
        throw Error("And Error occured while updating the Consulta");
    }
}

exports.updatePaciente = async function (paciente) {
    
    try {
        //Find the old User Object by the Id
        var oldPaciente = await Paciente.findOne({
            nroDocumento: paciente.nroDocumento
        })
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldPaciente) { 
        return false;
    }
    //Edit the User Object

    oldPaciente.direccion = paciente.direccion
    oldPaciente.localidad = paciente.localidad
    oldPaciente.provincia = paciente.provincia
    oldPaciente.codPostal = paciente.codPostal
    oldPaciente.nacionalidad = paciente.nacionalidad
    oldPaciente.email = paciente.email
    oldPaciente.telefono = paciente.telefono
    oldPaciente.obraSocial = paciente.obraSocial
    oldPaciente.plan = paciente.plan
    oldPaciente.afiliado = paciente.afiliado

    try {
        var savedPaciente = await oldPaciente.save()
        return savedPaciente;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.deletePaciente = async function (dni) {
    // Delete the User
    try {
        var deleted = await Paciente.deleteOne({
            nroDocumento: dni
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Paciente Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Paciente")
    }
}

exports.getPaciente= async  function (user){
    try {
        console.log("Paciente.dni en paciente.service",user.dni)
        var searchPaciente = await Paciente.findOne({
            nroDocumento: user.dni
        })
  
        console.log("searchPaciente en pac service",searchPaciente)
        if(!searchPaciente){
        }
        else{
            return searchPaciente;
        }    
    } catch (e) {
            throw Error("Error occured while Finding the User")
        }  
}

exports.bajaPaciente = async function (dni){
    try {
        var pacienteBaja = await Paciente.findOne({
            nroDocumento: dni
        })
    } catch (e) {
            throw Error("Error occured while Finding the Paciente")
        }
    if (!pacienteBaja) {
        return false;
    }
    pacienteBaja.estado = "desactivado"
    try {
        var savedPaciente = await pacienteBaja.save()
        return savedPaciente;
    } catch (e) {
        throw Error("And Error occured while updating the Paciente");
    }
}

exports.loginPaciente = async function (paciente) {

    // Creating a new Mongoose Object by using the new keyword
    console.log("login paciente",paciente)
    try {
        // Find the User 
        var _details = await Paciente.findOne({
            nroDocumento: paciente.dni
        });
        var passwordIsValid = bcrypt.compareSync(paciente.password, _details.password);
        if (!passwordIsValid) throw Error("Invalid username/password")

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}