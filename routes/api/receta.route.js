var express = require('express')
var router = express.Router()
var RecetaController = require('../../controllers/recetas.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */


router.get('/', Authorization, RecetaController.getRecetas)


// Export the Router
module.exports = router;
