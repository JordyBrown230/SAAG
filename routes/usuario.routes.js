const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

router.post('/agregar-usuario/', usuarioController.create);

router.get('/usuarios/', usuarioController.findAll);

router.get('/usuario/:id', usuarioController.findOne);

router.put('/actualizar-usuario/:id', usuarioController.update);

router.delete('/eliminar-usuario/:id', usuarioController.delete);

module.exports = router;
