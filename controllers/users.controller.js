var UserService = require('../services/user.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getUsers = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Users = await UserService.getUsers({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var User = {
        name: req.body.name,
        apellido: req.body.apellido,
        fechaNac: req.body.fechaNac,
        tipoDocumento: req.body.tipoDocumento,
        nroDocumento: req.body.nroDocumento,
        email: req.body.email,
        genero: req.body.genero,
        direccion: req.body.direccion,
        localidad: req.body.localidad,
        provincia: req.body.provincia,
        pais: req.body.pais,
        codPostal: req.body.codPostal,
        rol: req.body.rol,
        password: req.body.password,
        telefono: req.body.telefono,
        estado: "activo"
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await UserService.createUser(User)
        return res.status(201).json({token: createdUser, message: "Succesfully Created User"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}
                
exports.updateUser = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.nroDocumento) {
        return res.status(400).json({status: 400., message: "nroDocumento must be present"})
    }

    var nroDocumento = req.body.nroDocumento;
    var User = {
        nroDocumento,
        email: req.body.email ? req.body.email : null,
        direccion: req.body.direccion ? req.body.direccion : null,
        provincia: req.body.provincia ? req.body.provincia : null,
        localidad: req.body.localidad ? req.body.localidad : null,
        codPostal: req.body.codPostal ? req.body.codPostal : null,
        pais: req.body.pais ? req.body.pais : null,
        telefono: req.body.telefono ? req.body.telefono : null,
        
    }
    try {
        var updatedUser = await UserService.updateUser(User)
        if(!updatedUser){
            return res.status(200).json({status: 200, data: updatedUser, message: "Usuario Inexistente"})
        }
        else{
            return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
        }   
        
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await UserService.deleteUser(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.disableUser = async function (req, res, next){
    var id= req.params.id;
    try{
        var disabled = await UserService.bajaUser(id);
        res.status(200).send("Succesfully Disabled... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}

exports.resetPassword = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.nroDocumento) {
        return res.status(400).json({status: 400., message: "nroDocumento must be present"})
    }

    var usuario = {
        nroDocumento:req.body.nroDocumento,
        password: req.body.password,
    }

    try {
        var changePassword = await UserService.resetPassword(usuario)
        return res.status(200).json({status: 200, data: changePassword, message: "Succesfully Updated Usuario"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }

}

exports.getUser = async function (req, res, next){
    var User = {
        dni: req.body.dni,
    }

    try{
        var usuario = await UserService.getUser(User);
        if(!usuario){
            return res.status(202).json({status: 202, message: "Usuario inexistente"})
        }
        return res.status(200).json({status: 200, data: usuario, message: "Usuario encontrado"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}

exports.loginUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue a login",req.body)
    var User = {
        dni: req.body.dni,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        let loginUser = await UserService.loginUser(User);
        return res.status(201).json({token: loginUser[0],rol: loginUser[1] ,message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}