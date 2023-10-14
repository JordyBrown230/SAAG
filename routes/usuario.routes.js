const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

router.post('/usuario/', usuarioController.create);

router.get('/usuario/', usuarioController.findAll);

router.get('/usuario/:id', usuarioController.findOne);

router.put('/usuario/:id', usuarioController.update);

router.delete('/usuario/:id', usuarioController.delete);

module.exports = router;
