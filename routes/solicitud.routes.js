const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitud.controller');

// Crea una nueva solicitud
router.post('/agregar-solicitud/', solicitudController.create);

// Obtiene todas las solicitudes
router.get('/solicitudes/', solicitudController.findAll);

// Obtiene una solicitud por ID
router.get('/solicitud/:id', solicitudController.findOne);

router.get('/solicitudes-por-colaborador/:id',solicitudController.getAllSolicitudesPorColaborador);

// Actualiza una solicitud por ID
router.put('/actualizar-solicitud/:id', solicitudController.update);

// Elimina una solicitud por ID
router.delete('/eliminar-solicitud/:id', solicitudController.delete);


module.exports = router;
