const db = require('../models');
const Solicitud = db.solicitud;
const Colaborador = db.colaborador; // Import the Colaborador model if not already imported

// Crea una nueva solicitud
exports.create = (req, res, next) => {  // crear correo automatico
  if (req.body.length==0) {
    res.status(400).send({
      message: 'No puede venir sin datos'
    });
    return;
  }
  // Crea una nueva solicitud
  Solicitud.create(req.body)
    .then(data => {
      res.status(200).send({
        message: `Agregada correctamente la solicitud de ${req.body.nombreColaborador}`,
        data:data
      });   
      req.id = data.idSolicitud;  
      next();
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Ocurrió un error al crear la solicitud.'
      });
    });
};


exports.findAll = (req,res, next) => { //en Express.js toman dos argumentos: req (la solicitud) y res (la respuesta).
  Solicitud.findAll({
    include: [
      { 
        model: Colaborador,
         as: 'colaborador' ,
         attributes: {
         exclude: ['fotoCarnet']
        }
     }
    ],

  })
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

exports.findAllBySupervisor = (req, res, next) => {
  const idSupervisor = req.params.id; // Supongamos que recibes el ID del supervisor desde el front-end

  Solicitud.findAll({
    include: [
      {
        model: Colaborador,
        as: 'colaborador',
        attributes: {
          exclude: ['fotoCarnet']
        },
        where: {
          idColaborador_fk: idSupervisor 
        }
      }
    ]
  })
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Ocurrió un error al obtener las solicitudes.'
      });
    });
};


// Obtiene una solicitud por ID
exports.findOne = (req, res, next) => {
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
exports.update = (req, res, next) => {
  const id = req.params.id;
  // Busca la solicitud en la base de datos
  Solicitud.findByPk(id)
    .then(solicitud => {
      if (!solicitud) {
        res.status(404).send({
          message: `No se encontró una solicitud con ID ${id}`
        });
      } else {

        req.datos = {...solicitud.get()};
        // Actualiza la solicitud con los nuevos datos del cuerpo de la solicitud
        solicitud.update(req.body)
          .then(() => {
            res.status(200).send({
              message: `Actualizada correctamente la solicitud con ID ${id}`,
              solicitud:solicitud
            }); 
            next();   
          })
          .catch(err => {
            res.status(500).send({
              message: `Ocurrió un error al actualizar la solicitud con ID ${id}: ${err.message}`,
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Ocurrió un error al obtener la solicitud con ID ${id}: ${err.message}`
      });
    });
};


exports.delete = (req, res, next) => {
  const id = req.params.id;

  // Busca la solicitud en la base de datos
  Solicitud.findByPk(id)
    .then(solicitud => {
      if (!solicitud) {
        res.status(404).send({
          message: `No se encontró una solicitud con ID ${id}`
        });
      } else {

        req.datos = {...solicitud.get()};
        // Elimina la solicitud de la base de datos
        solicitud.destroy()
          .then(() => {
            res.send({
              message: 'La solicitud fue eliminada exitosamente'
            });
            next();
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

exports.getAllSolicitudesPorColaborador = (req, res, next) => {
  const colaboradorId = req.params.id;

  Solicitud.findAll({
    where: { idColaborador: colaboradorId },
    include: [{ model: Colaborador, as: 'colaborador' }],
  })
    .then(data => {
      if (data.length === 0) {
        res.status(404).send({
          message: 'No se encontraron solicitudes para este colaborador',
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Ocurrió un error al obtener las solicitudes del colaborador.',
      });
    });
};

