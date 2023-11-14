const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');

router.get('/admin', authenticateToken, authorizeRoles(['admin']), (req, res) => {
  // Ruta protegida solo para usuarios con rol 'admin'
  res.json({ message: 'Acceso permitido para el rol de administrador' });
});

// No necesita verificación
router.post('/login/', usuarioController.login);
router.post('/refresh/:token',  usuarioController.refreshToken);

router.post('/agregar-usuario/',  authenticateToken, authorizeRoles(['admin']), usuarioController.create);

router.get('/usuarios/', authenticateToken, authorizeRoles(['admin']), usuarioController.findAll);

router.get('/usuario/:id', authenticateToken, authorizeRoles(['admin']), usuarioController.findOne);

router.put('/actualizar-usuario/:id', authenticateToken, authorizeRoles(['admin']), usuarioController.update);

router.delete('/eliminar-usuario/:id', authenticateToken, authorizeRoles(['admin']), usuarioController.delete);

module.exports = router;

