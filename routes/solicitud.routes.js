const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitud.controller');

// Crea una nueva solicitud
router.post('/', solicitudController.create);

// Obtiene todas las solicitudes
router.get('/', solicitudController.findAll);

// Obtiene una solicitud por ID
router.get('/:id', solicitudController.findOne);

// Actualiza una solicitud por ID
router.put('/:id', solicitudController.update);

// Elimina una solicitud por ID
router.delete('/:id', solicitudController.delete);

module.exports = router;
