const db = require('../models');
const Ausencia = db.ausencia;
const Colaborador = db.colaborador; // Import the Colaborador model if not already imported

// Crea una nueva ausencia
exports.create = (req, res) => {
  if (req.body.length==0) {
    res.status(400).send({
      message: 'No puede venir sin datos'
    });
    return;
  }
  // Crea una nueva ausencia
  Ausencia.create(req.body)
    .then(data => {
      res.status(200).send({
        message: `Agregada correctamente la ausencia de ${req.body.nombreColaborador}`
      });      })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Ocurrió un error al crear la ausencia.'
      });
    });
};


exports.findAll = (req,res) => { //en Express.js toman dos argumentos: req (la ausencia) y res (la respuesta).
  Ausencia.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Ocurrió un error al obtener las ausencias.'
      });
    });
};

// Obtiene una ausencia por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ausencia.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se encontró una ausencia con ID ${id}`
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Ocurrió un error al obtener la ausencia con ID ${id}`
      });
    });
};

// Actualiza una ausencia por ID
exports.update = (req, res) => {
  const id = req.params.id;
  // Busca la ausencia en la base de datos
  Ausencia.findByPk(id)
    .then(ausencia => {
      if (!ausencia) {
        res.status(404).send({
          message: `No se encontró una ausencia con ID ${id}`
        });
      } else {
        // Actualiza la ausencia con los nuevos datos del cuerpo de la ausencia
        ausencia.update(req.body)
          .then(() => {
            res.status(200).send({
              message: `Actualizada correctamente la ausencia con ID ${id}`
            });          
          })
          .catch(err => {
            res.status(500).send({
              message: `Ocurrió un error al actualizar la ausencia con ID ${id}: ${err.message}`
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Ocurrió un error al obtener la ausencia con ID ${id}: ${err.message}`
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  // Busca la ausencia en la base de datos
  Ausencia.findByPk(id)
    .then(ausencia => {
      if (!ausencia) {
        res.status(404).send({
          message: `No se encontró una ausencia con ID ${id}`
        });
      } else {
        // Elimina la ausencia de la base de datos
        ausencia.destroy()
          .then(() => {
            res.send({
              message: 'La ausencia fue eliminada exitosamente'
            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || `Ocurrió un error al eliminar la ausencia con ID ${id}`
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Ocurrió un error al obtener la ausencia con ID ${id}`
      });
    });
};

exports.getAllAusenciasPorColaborador = (req, res) => {
  const colaboradorId = req.params.id;

  Ausencia.findAll({
    where: { idColaborador: colaboradorId },
    include: [{ model: Colaborador, as: 'colaborador' }],
  })
    .then(data => {
      if (data.length === 0) {
        res.status(404).send({
          message: 'No se encontraron ausencias para este colaborador',
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Ocurrió un error al obtener las ausencias del colaborador.',
      });
    });
};

