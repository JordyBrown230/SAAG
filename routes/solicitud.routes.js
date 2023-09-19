const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitud.controller');

// Crea una nueva solicitud
router.post('/solicitud/', solicitudController.create);

// Obtiene todas las solicitudes
router.get('/solicitudes/', solicitudController.findAll);

// Obtiene una solicitud por ID
router.get('/solicitud/:id', solicitudController.findOne);

// Actualiza una solicitud por ID
router.put('/solicitud/:id', solicitudController.update);

// Elimina una solicitud por ID
router.delete('/solicitud/:id', solicitudController.delete);

module.exports = router;
