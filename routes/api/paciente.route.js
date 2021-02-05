var express = require('express')
var router = express.Router()
var PacienteController = require('../../controllers/pacientes.controller');
var Authorization = require('../../auth/authorization');
const Paciente = require('../../models/pacientes.model');


// Authorize each API with middleware and map to the Controller Functions
/* GET pacientes listing. */

router.post('/', Authorization, PacienteController.getPacientes)
router.post('/buscarpaciente', Authorization, PacienteController.getPaciente)
router.post('/registration', PacienteController.createPaciente)
router.post('/login/', PacienteController.loginPaciente)
router.put('/', Authorization, PacienteController.updatePaciente)
router.put('/bajas/:id', Authorization, PacienteController.disablePaciente)
router.delete('/:id', Authorization, PacienteController.removePaciente)
router.put('/antecedentesPaciente', Authorization, PacienteController.updateAntecedentesPaciente)
router.put('/nuevaconsulta',Authorization,PacienteController.nuevaConsulta)
router.post('/resetpassword',Authorization,PacienteController.resetPassword)
router.post('/editAntecedentePaciente', Authorization, PacienteController.updateAntecedentesPaciente)

// Export the Router
module.exports = router;

