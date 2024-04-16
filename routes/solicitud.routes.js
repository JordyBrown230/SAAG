const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitud.controller');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');


router.post('/agregar-solicitud/', authenticateToken, solicitudController.create);

router.put('/actualizar-solicitud/:id', authenticateToken, solicitudController.update);

router.get('/solicitudes/', authenticateToken, authorizeRoles(['admin']), solicitudController.findAll);

router.get('/solicitudes-por-supervisor/:id', authenticateToken, authorizeRoles(['supervisor']), solicitudController.findAllBySupervisor);

router.get('/solicitud/:id', authenticateToken, authorizeRoles(['admin']), solicitudController.findOne);

router.get('/solicitudes-por-colaborador/:id', authenticateToken, authorizeRoles(['admin']), solicitudController.getAllSolicitudesPorColaborador);

router.delete('/eliminar-solicitud/:id', authenticateToken, authorizeRoles(['admin']), solicitudController.delete);

module.exports = router;
