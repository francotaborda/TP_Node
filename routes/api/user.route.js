var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a api/user.routes');
  });
router.post('/registration',Authorization, UserController.createUser)
router.post('/login/', UserController.loginUser)
router.get('/', Authorization, UserController.getUsers)
router.post('/buscaruser', Authorization, UserController.getUser)
router.put('/', Authorization, UserController.updateUser)
router.delete('/:id', Authorization, UserController.removeUser)
router.put('/bajas/:id', Authorization, UserController.disableUser)
router.put('/resetpassword',Authorization,UserController.resetPassword)
      
// Export the Router
module.exports = router;



//api/users
//api/users/registration
//api/users/login