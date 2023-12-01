const db = require("../models");
const Auditoria = db.auditoria;


exports.create = async (req, res) => {
 
  if (req.body.length === 0) {
    res.status(400).send({
      message: "No puede venir sin datos",
    });
    return;
  }

    const idUsuario = req.user.id;
    const nombreUsuario =  req.user.nombreUsuario;
    const rol =  req.user.rol;
    const metodo = req.method;
    const url = req.originalUrl;

    Auditoria.create({
        idUsuario,
        nombreUsuario,
        rol,
        metodo,
        url,
    })
    .then((data) => {

    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear la auditoria.",
      });
    });
};

exports.findAll = async (req, res) => {
    try {
      const data = await Auditoria.findAll();
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


// Obtiene una auditoria por ID
exports.findOne = (req, res, next) => {
  const id = req.params.id;

  Auditoria.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `No se encontró una auditoria con ID ${id}`,
        });
      } else {
        next();
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Ocurrió un error al obtener la auditoria con ID ${id}`,
      });
    });
};


exports.delete = (req, res, next) => {
  const id = req.params.id;

  // Busca el auditoria en la base de datos
  Auditoria.findByPk(id)
    .then((auditoria) => {
      if (!auditoria) {
        res.status(404).send({
          message: `No se encontró una auditoria con ID ${id}`,
        });
      } else {
        auditoria
          .destroy()
          .then(() => {
            res.send({
              message: "La auditoria fue eliminado exitosamente",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                `Ocurrió un error al eliminar la auditoria con ID ${id}`,
            });
          });
          next();
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Ocurrió un error al obtener la auditoria con ID ${id}`,
      });
    });
};
