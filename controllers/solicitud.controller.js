const db = require('../models');
const Solicitud = db.solicitud;
//prueba
// Crea una nueva solicitud
exports.create = (req, res) => {
  // Verifica si la solicitud tiene una descripción
  if (!req.body.descripcion) {
    res.status(400).send({
      message: 'La descripción no puede estar vacía'
    });
    return;
  }
  // Crea una nueva solicitud
  const solicitud = {
    descripcion: req.body.descripcion
  };

  // Guarda la solicitud en la base de datos
  Solicitud.create(solicitud)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Ocurrió un error al crear la solicitud.'
      });
    });
};


// Obtiene todas las solicitudes
exports.findAll = (req, res) => {
  Solicitud.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Ocurrió un error al obtener las solicitudes.'
      });
    });
};

// Obtiene una solicitud por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Solicitud.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se encontró una solicitud con ID ${id}`
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Ocurrió un error al obtener la solicitud con ID ${id}`
      });
    });
};

// Actualiza una solicitud por ID
exports.update = (req, res) => {
  const id = req.params.id;

  // Busca la solicitud en la base de datos
  Solicitud.findByPk(id)
    .then(solicitud => {
      if (!solicitud) {
        res.status(404).send({
          message: `No se encontró una solicitud con ID ${id}`
        });
      } else {
        // Actualiza la solicitud con los nuevos datos
        solicitud.descripcion = req.body.descripcion;

        // Guarda la solicitud actualizada en la base de datos
        solicitud.save()
          .then(() => {
            res.send(solicitud);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || `Ocurrió un error al actualizar la solicitud con ID ${id}`
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Ocurrió un error al obtener la solicitud con ID ${id}`
      });
    });
};

// Elimina una solicitud por ID
exports.delete = (req, res) => {
  const id = req.params.id;

  // Busca la solicitud en la base de datos
  Solicitud.findByPk(id)
    .then(solicitud => {
      if (!solicitud) {
        res.status(404).send({
          message: `No se encontró una solicitud con ID ${id}`
        });
      } else {
        // Elimina la solicitud de la base de datos
        solicitud.destroy()
          .then(() => {
            res.send({
              message: 'La solicitud fue eliminada exitosamente'
            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || `Ocurrió un error al eliminar la solicitud con ID ${id}`
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Ocurrió un error al obtener la solicitud con ID ${id}`
      });
    });
};
