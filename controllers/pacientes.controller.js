var PacienteService = require('../services/paciente.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getPacientes = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Pacientes = await PacienteService.getPacientes({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Pacientes, message: "Succesfully Pacientes Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createPaciente = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Paciente = {
        name: req.body.name,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
        fechaNac: req.body.fechaNac,
        nroDocumento: req.body.nroDocumento,
        genero: req.body.genero,
        direccion: req.body.direccion,
        rol: "Paciente",
        obraSocial: req.body.obraSocial,
        plan: req.body.plan,
        afiliado: req.body.afiliado,
        provincia: req.body.provincia,
        localidad: req.body.localidad,
        codPostal: req.body.codPostal,
        nacionalidad: req.body.nacionalidad,
        tipoDocumento: req.body.tipoDocumento,
        telefono: req.body.telefono,
        estado: "activo",
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
    }

    try {
        // Calling the Service function with the new object from the Request Body


        var createdPaciente = await PacienteService.createPaciente(Paciente)
        return res.status(201).json({token: createdPaciente, message: "Succesfully Created Paciente"})

    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Paciente Creation was Unsuccesfull"})
    }

}

exports.updateAntecedentesPaciente = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.nroDocumento) {
        return res.status(400).json({status: 400., message: "nroDocumento must be present"})
    }
    var nroDocumento = req.body.nroDocumento;
    var Paciente = {
       nroDocumento,
       habitosPersonales:{
            fumo: req.body.habitosPersonales.fumo ? req.body.habitosPersonales.fumo: null,
            fuma: req.body.habitosPersonales.fuma ? req.body.habitosPersonales.fumo: null,
            cuantoFuma: req.body.habitosPersonales.cuantoFuma ? req.body.habitosPersonales.cuantoFuma: null,
            consumioAlcohol: req.body.habitosPersonales.consumioAlcohol ? req.body.habitosPersonales.consumioAlcohol: null,
            consumeAlcohol: req.body.habitosPersonales.consumeAlcohol ? req.body.habitosPersonales.consumeAlcohol: null,
            cuantoAlcohol: req.body.habitosPersonales.cuantoAlcohol ? req.body.habitosPersonales.cuantoAlcohol: null,
            consumeDrogas: req.body.habitosPersonales.consumeDrogas ? req.body.habitosPersonales.consumeDrogas: null,
            acupuntura: req.body.habitosPersonales.acupuntura ? req.body.habitosPersonales.acupuntura: null,
            tatuajes: req.body.habitosPersonales.tatuajes ? req.body.habitosPersonales.tatuajes: null,
        },
        antecedentesFamiliares:{
            diabetes: req.body.antecedentesFamiliares.diabetes ? req.body.antecedentesFamiliares.diabetes: null,
            cancer: req.body.antecedentesFamiliares.cancer ? req.body.antecedentesFamiliares.cancer: null,
            hipertension: req.body.antecedentesFamiliares.hipertension ? req.body.antecedentesFamiliares.hipertension: null,
            cardiacos: req.body.antecedentesFamiliares.cardiacos ? req.body.antecedentesFamiliares.cardiacos: null,
        },
        antecedentesPersonales:{
            hospitalizado: req.body.antecedentesPersonales.hospitalizado ? req.body.antecedentesPersonales.hospitalizado: null,
            tranfusiones: req.body.antecedentesPersonales.tranfusiones ? req.body.antecedentesPersonales.tranfusiones: null,
            infecciones: req.body.antecedentesPersonales.infecciones ? req.body.antecedentesPersonales.infecciones: null,
        },
        enfermedades:{
            alergia: req.body.enfermedades.alergia ? req.body.enfermedades.alergia: null,
            hepatitis: req.body.enfermedades.hepatitis ? req.body.enfermedades.hepatitis: null,
            endocrinas: req.body.enfermedades.endocrinas ? req.body.enfermedades.endocrinas: null,
            neurologico: req.body.enfermedades.neurologico ? req.body.enfermedades.neurologico: null,
            diabetes: req.body.enfermedades.diabetes ? req.body.enfermedades.diabetes: null,
            neumonia: req.body.enfermedades.neumonia ? req.body.enfermedades.neumonia: null,
            osteoarticulares: req.body.enfermedades.osteoarticulares ? req.body.enfermedades.osteoarticulares: null,
            dialisis: req.body.enfermedades.dialisis ? req.body.enfermedades.dialisis: null,
            hemofilia: req.body.enfermedades.hemofilia ? req.body.enfermedades.hemofilia: null,
            hipotension: req.body.enfermedades.hipotension ? req.body.enfermedades.hipotension: null,
            psiquiatricos: req.body.enfermedades.psiquiatricos ? req.body.enfermedades.psiquiatricos: null,
            sifilis: req.body.enfermedades.sifilis ? req.body.enfermedades.sifilis: null,
            renal: req.body.enfermedades.renal ? req.body.enfermedades.renal: null,
            hipertension: req.body.enfermedades.hipertension ? req.body.enfermedades.hipertension: null,
            cardiacas: req.body.enfermedades.cardiacas ? req.body.enfermedades.cardiacas: null,
            tuberculosis: req.body.enfermedades.tuberculosis ? req.body.enfermedades.tuberculosis: null,
        }
    }
    try {
        var updatedPaciente = await PacienteService.updateAntecedentesPaciente(Paciente)
        return res.status(200).json({status: 200, data: updatedPaciente, message: "Succesfully Updated Paciente"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.nuevaConsulta = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.nroDocumento) {
        return res.status(400).json({status: 400., message: "nroDocumento must be present"})
    }

    var nroDocumento = req.body.nroDocumento;
    var Paciente = {
        nroDocumento,
        consultas:{
            consulta: req.body.consultas.consulta ? req.body.consultas.consulta: null,
            diagnostico: req.body.consultas.diagnostico ? req.body.consultas.diagnostico: null,
        }
    }

    try {
        var updatedPaciente = await PacienteService.nuevaConsulta(Paciente)
        return res.status(200).json({status: 200, data: updatedPaciente, message: "Succesfully Updated Consulta"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.resetPassword = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.dni) {
        return res.status(400).json({status: 400., message: "nroDocumento must be present"})
    }

    var Paciente = {
        nroDocumento:req.body.dni,
        password: req.body.password,
    }

    try {
        var changePassword = await PacienteService.resetPassword(Paciente)
        return res.status(200).json({status: 200, data: changePassword, message: "Succesfully Updated Paciente"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }

}

exports.updatePaciente = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.nroDocumento) {
        return res.status(400).json({status: 400., message: "nroDocumento must be present"})
    }

    var nroDocumento = req.body.nroDocumento;
    var Paciente = {
        nroDocumento,
        direccion: req.body.direccion ? req.body.direccion : null,
        provincia: req.body.provincia ? req.body.provincia : null,
        localidad: req.body.localidad ? req.body.localidad : null,
        codPostal: req.body.codPostal ? req.body.codPostal : null,
        nacionalidad: req.body.nacionalidad ? req.body.nacionalidad : null,
        email: req.body.email ? req.body.email : null,
        telefono: req.body.telefono ? req.body.telefono : null,
        obraSocial: req.body.obraSocial ? req.body.obraSocial : null,
        plan: req.body.plan ? req.body.plan  : null,
        afiliado: req.body.afiliado ? req.body.afiliado : null,
    }
    try {
        var updatedPaciente = await PacienteService.updatePaciente(Paciente)
        return res.status(200).json({status: 200, data: updatedPaciente, message: "Succesfully Updated Paciente"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removePaciente = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await PacienteService.deletePaciente(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.disablePaciente = async function (req, res, next){
    var id= req.params.id;
    try{
        var disabled = await PacienteService.bajaPaciente(id);
        res.status(200).send("Succesfully Disabled... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}

exports.getPaciente = async function (req, res, next){
    //console.log("req paciente controller",req.body)
    var Paciente = {
        dni: req.body.dni,
    }
    
    try{
        var paciente = await PacienteService.getPaciente(Paciente);
        //console.log("Controller paciente en get paciente controller",paciente)
   
        if(!paciente){
            return res.status(202).json({status: 202, message: "Paciente inexistente"})
        }
        return res.status(200).json({status: 200, data: paciente, message: "Paciente encontrado"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}

exports.loginPaciente = async function (req, res, next) {
    // Req.Body contains the form submit values.

    var Paciente = {
        dni: req.body.dni,
        password: req.body.password
    }
    
    try {
        // Calling the Service function with the new object from the Request Body
        var loginPaciente = await PacienteService.loginPaciente(Paciente);
        
        return res.status(201).json({token: loginPaciente, message: "Succesfully loooooogin"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}