const express = require('express');
const router = express.Router();
const ausenciaController = require('../controllers/ausencia.controller');

// Crea una nueva ausencia
router.post('/ausencia/', ausenciaController.create);

// Obtiene todas las ausenciaes
router.get('/ausencias/', ausenciaController.findAll);

// Obtiene una ausencia por ID
router.get('/ausencia/:id', ausenciaController.findOne);

// Actualiza una ausencia por ID
router.put('/ausencia/:id', ausenciaController.update);

// Elimina una ausencia por ID
router.delete('/ausencia/:id', ausenciaController.delete);

module.exports = router;
