const db = require("../models");
const Usuario = db.usuario;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
  console.log(req.body.nombreUsuario,req.body.idColaborador,req.body.contrasena);
  if (req.body.length === 0) {
    res.status(400).send({
      message: "No puede venir sin datos",
    });
    return;
  }


  if (!validarContrasena(req.body.contrasena)) {
    res.status(400).send({
      message: "La contraseña no cumple con las reglas requeridas.",
    });
    return;
  }

  // Encriptar la contraseña antes de guardarla en la base de datos
  const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);

  // Crear un nuevo usuario con la contraseña encriptada
  Usuario.create({
    nombreUsuario: req.body.nombreUsuario,
    contrasena: hashedPassword,
    rol: req.body.rol,
    idColaborador: req.body.idColaborador,
  })
    .then((data) => {
      res.status(200).send({
        message: `Agregado correctamente el usuario del colaborador con id ${req.body.idColaborador}`,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el usuario.",
      });
    });
};

exports.findAll = async (req, res) => {
  try {
    const data = await Usuario.findAll();
    res.send(data);
  } catch (err) {
    if (err.name === 'SequelizeDatabaseError') {
      res.status(500).send({
        message: "Error en la base de datos. Verifica la configuración.",
      });
    } else {
      res.status(500).send({
        message: "Ocurrió un error al obtener los usuarios.",
      });
    }
  }
};


// Obtiene un usuario por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Usuario.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `No se encontró un usuario con ID ${id}`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Ocurrió un error al obtener el usuario con ID ${id}`,
      });
    });
};

// Actualiza un usuario por ID
// Actualiza un usuario por ID
exports.update = async (req, res) => {
  const id = req.params.id;

  if (!validarContrasena(req.body.contrasena)) {
    res.status(400).send({
      message: "La contraseña no cumple con las reglas requeridas.",
    });
    return;
  }

  try {
    // Busca el usuario en la base de datos
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      res.status(404).send({
        message: `No se encontró un usuario con ID ${id}`,
      });
      return;
    }

    // Encriptar la nueva contraseña antes de actualizarla
    const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);

    // Actualiza el usuario con los nuevos datos del cuerpo del usuario, incluyendo la contraseña encriptada
    await usuario.update({
      nombreUsuario: req.body.nombreUsuario,
      contrasena: hashedPassword,
      rol: req.body.rol,
      idColaborador: req.body.idColaborador,
    });

    res.status(200).send({
      message: `Actualizado correctamente el usuario con ID ${id}`,
    });
  } catch (err) {
    res.status(500).send({
      message: `Ocurrió un error al actualizar el usuario con ID ${id}: ${err.message}`,
    });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  // Busca el usuario en la base de datos
  Usuario.findByPk(id)
    .then((usuario) => {
      if (!usuario) {
        res.status(404).send({
          message: `No se encontró un usuario con ID ${id}`,
        });
      } else {
        // Elimina el usuario de la base de datos
        usuario
          .destroy()
          .then(() => {
            res.send({
              message: "El usuario fue eliminado exitosamente",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                `Ocurrió un error al eliminar el usuario con ID ${id}`,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Ocurrió un error al obtener el usuario con ID ${id}`,
      });
    });
};

exports.login = (req, res) => {
  const { nombreUsuario, contrasena } = req.body;

  // Buscar el usuario por nombre de usuario
  Usuario.findOne({ where: { nombreUsuario } })
    .then(async (usuario) => {
      if (!usuario) {
        return res
          .status(401)
          .json({ message: "Nombre de usuario inexistente" });
      }

      // Verificar la contraseña utilizando bcrypt.compare
      const verificarContrasena = await bcrypt.compare(
        contrasena,
        usuario.contrasena
      );

      if (!verificarContrasena) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      // Las credenciales son válidas, generar un token JWT
      const token = jwt.sign(
        {
          nombreUsuario: usuario.nombreUsuario,
          id: usuario.idUsuario,
          rol: usuario.rol,
        },
        "secret_key",
        { expiresIn: "1h" }
      );

      // Enviar el token al cliente
      res.json({ token });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error interno del servidor" });
    });
};

function validarContrasena(contrasena) {
  return (
    contrasena.length >= 8 &&
    /[A-Z]/.test(contrasena) && // Al menos una letra mayúscula
    /[a-z]/.test(contrasena) && // Al menos una letra minúscula
    /[0-9]/.test(contrasena) && // Al menos un número
    /[@#$%^&*_!.]/.test(contrasena) // Al menos un carácter especial (puedes modificar esta lista)
  );
}
