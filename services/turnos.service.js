// Gettign the Newly created Mongoose Model we just created 
var Turno = require('../models/turnos.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { getMaxListeners } = require('../models/turnos.model');


exports.createTurnos = async function (turno) {
    // Creating a new Mongoose Object by using the new keyword

    var newTurnos = new Turno({
        dia: turno.dia,
        horaInicio: turno.horaInicio,
        jornadaLaboral: turno.jornadaLaboral,
        duracionTurno: turno.duracionTurno,
        medico: turno.medico,
    })

    try {
        // Saving the User 
        var saveTurnos = await newTurnos.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating User")
    }
}