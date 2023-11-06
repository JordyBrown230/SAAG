const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');

router.get('/admin', authenticateToken, authorizeRoles(['admin']), (req, res) => {
  // Ruta protegida solo para usuarios con rol 'admin'
  res.json({ message: 'Acceso permitido para el rol de administrador' });
});

module.exports = router;

router.post('/agregar-usuario/', usuarioController.create);

router.post('/login/', usuarioController.login);

router.get('/usuarios/', usuarioController.findAll);

router.get('/usuario/:id', usuarioController.findOne);

router.put('/actualizar-usuario/:id', usuarioController.update);

router.delete('/eliminar-usuario/:id',  authenticateToken, authorizeRoles(['admin']),usuarioController.delete);

module.exports = router;

