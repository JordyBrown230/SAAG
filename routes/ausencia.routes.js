const express = require('express');
const router = express.Router();
const ausenciaController = require('../controllers/ausencia.controller');

// Crea una nueva ausencia
router.post('/agregar-ausencia/', ausenciaController.create);

// Obtiene todas las ausenciaes
router.get('/ausencias/', ausenciaController.findAll);

// Obtiene una ausencia por ID
router.get('/ausencia/:id', ausenciaController.findOne);

router.get('/ausencias-por-colaborador/:id',ausenciaController.getAllAusenciasPorColaborador);

// Actualiza una ausencia por ID
router.put('/actualizar-ausencia/:id', ausenciaController.update);

// Elimina una ausencia por ID
router.delete('/eliminar-ausencia/:id', ausenciaController.delete);

//Funciones especialies

//Busca en un rango de fechas 
//router.get('/ausencias-en-rango/', ausenciaController.getAusenciasEnRango);

module.exports = router;
