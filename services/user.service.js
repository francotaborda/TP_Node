// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { getMaxListeners } = require('../models/User.model');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Users = await User.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Users;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Users');
    }
}

exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    var newUser = new User({
        name: user.name,
        apellido: user.apellido,
        email: user.email,
        fechaNac: user.fechaNac,
        password: hashedPassword,
        nroDocumento: user.nroDocumento,
        genero: user.genero,
        direccion: user.direccion,
        rol: user.rol,
        provincia: user.provincia,
        localidad: user.localidad,
        codPostal: user.codPostal,
        pais: user.pais,
        tipoDocumento: user.tipoDocumento,
        telefono: user.telefono,
        estado: "activo"
    })

    try {
        // Saving the User 
        var savedUser = await newUser.save();
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

exports.resetPassword = async function (user) {
    // Creating a new Mongoose Object by using the new keyword

    try {
        //Find the old User Object by the Id
        var newPassUser = await User.findOne({
            nroDocumento: user.nroDocumento
        })
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!newPassUser) { 
        return false;
    }
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    newPassUser.password = hashedPassword;

    try {
        var savedUser = await newPassUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the Password");
    }

}

exports.updateUser = async function (user) {

    try {
        //Find the old User Object by the Id
        var oldUser = await User.findOne({
            nroDocumento: user.nroDocumento
        })
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    //Edit the User Object
    oldUser.email = user.email
    oldUser.direccion = user.direccion
    oldUser.provincia = user.provincia
    oldUser.localidad = user.localidad
    oldUser.codPostal = user.codPostal
    oldUser.pais = user.pais
    oldUser.telefono = user.telefono

    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.getUser = async  function (user){
    try {
        var searchUser = await User.findOne({
            nroDocumento: user.dni
        })
        if(!searchUser){
        }
        else{
            return searchUser;
        }
        
    } catch (e) {
            throw Error("Error occured while Finding the User")
        }  
}

exports.bajaUser = async function (dni){
    try {
        var userBaja = await User.findOne({
            nroDocumento: dni
        })
    } catch (e) {
            throw Error("Error occured while Finding the User")
        }
    if (!userBaja) {
        return false;
    }
    userBaja.estado = "desactivado"
    try {
        var savedUser = await userBaja.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.loginUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword

    try {
        // Find the User 
        var _details = await User.findOne({
            nroDocumento: user.dni
        });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) throw Error("Invalid username/password")

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        rol=_details.rol
       return [token,rol];
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }
}