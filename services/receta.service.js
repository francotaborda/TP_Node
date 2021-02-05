// Gettign the Newly created Mongoose Model we just created 
var Receta = require('../models/recetas.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { getMaxListeners } = require('../models/recetas.model');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getRecetas = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Recetas = await Receta.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Recetas;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Recetas');
    }
}
