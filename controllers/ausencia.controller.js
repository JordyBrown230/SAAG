const db = require('../models');
const Ausencia = db.ausencia;

// Crea una nueva ausencia
exports.create = (req, res) => {
  

  if (!req.body.fechaAusencia) {
    res.status(400).send({
      message: 'La fecha no puede estar vacía'
    })
    ;
    return;
  }

  if (!req.body.idColaborador) {
    res.status(400).send({
      message: 'El id del colaborador no puede estar vacío'
    })
    ;
    return;
  }


  // Crea una nueva ausencia
  const ausencia = {
    fechaAusencia: req.body.fechaAusencia,
    fechaFin: req.body.fechaFin,
    razon: req.body.razon,
    idColaborador: req.body.idColaborador
  };

  // Guarda la ausencia en la base de datos
  Ausencia.create(ausencia)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Ocurrió un error al crear la ausencia.'
      });
    });
};


// Obtiene todas las ausenciaes
exports.findAll = (req, res) => {
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
          message: `No se encontró un ausencia con ID ${id}`
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
          message: `No se encontró un ausencia con ID ${id}`
        });
      } else {
        // Actualiza la ausencia con los nuevos datos
        ausencia.descripcion = req.body.descripcion;

        // Guarda la ausencia actualizada en la base de datos
        ausencia.save()
          .then(() => {
            res.send(ausencia);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || `Ocurrió un error al actualizar la ausencia con ID ${id}`
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

// Elimina una ausencia por ID
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
