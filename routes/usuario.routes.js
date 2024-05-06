const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { authenticateToken, authorizeRoles} = require('../middlewares/auth.middleware');
const {auditLogin, auditLogout} = require('../middlewares/audit.middleware');
const cors = require('cors');

router.options('*', cors());

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

router.get('/admin', authenticateToken, authorizeRoles(['admin']), (req, res) => {
  res.json({ message: 'Acceso permitido para el rol de administrador' });
});

// No necesita verificación
router.post('/login/', usuarioController.login, auditLogin);

router.post('/logout/:token',  usuarioController.logout, auditLogout);

router.post('/refresh/:token',  usuarioController.refreshToken);

router.post('/agregar-usuario/',  authenticateToken, authorizeRoles(['admin']), usuarioController.create);

router.get('/usuarios/', authenticateToken, authorizeRoles(['admin']), usuarioController.findAll);

router.get('/usuario/:id', authenticateToken, authorizeRoles(['admin']), usuarioController.findOne);

router.put('/actualizar-usuario/:id', authenticateToken, authorizeRoles(['admin']), usuarioController.update);

router.delete('/eliminar-usuario/:id', authenticateToken, authorizeRoles(['admin']), usuarioController.delete);

module.exports = router;