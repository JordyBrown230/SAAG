    const db = require('../models');
    const Usuario = db.usuario;

    // Crea un nuevo usuario
exports.create = (req, res) => {
    if (req.body.length==0) {
      res.status(400).send({
        message: 'No puede venir sin datos'
      });
      return;
    }
    // Crea un nuevo usuario
    Usuario.create(req.body)
      .then(data => {
        res.status(200).send({
          message: `Agregado correctamente el usuario del colaborador con id ${req.body.idColaborador}`
        });      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || 'Ocurrió un error al crear el usuario.'
        });
      });
  };
  
  
  exports.findAll = (req,res) => { //en Express.js toman dos argumentos: req (la usuario) y res (la respuesta).
    Usuario.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || 'Ocurrió un error al obtener los usuarios.'
        });
      });
  };
  
  // Obtiene un usuario por ID
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Usuario.findByPk(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `No se encontró un usuario con ID ${id}`
          });
        } else {
          res.send(data);
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Ocurrió un error al obtener el usuario con ID ${id}`
        });
      });
  };
  
  // Actualiza un usuario por ID
  exports.update = (req, res) => {
    const id = req.params.id;
    // Busca el usuario en la base de datos
    Usuario.findByPk(id)
      .then(usuario => {
        if (!usuario) {
          res.status(404).send({
            message: `No se encontró un usuario con ID ${id}`
          });
        } else {
          // Actualiza el usuario con los nuevos datos del cuerpo del usuario
          usuario.update(req.body)
            .then(() => {
              res.status(200).send({
                message: `Actualizado correctamente el usuario con ID ${id}`
              });          
            })
            .catch(err => {
              res.status(500).send({
                message: `Ocurrió un error al actualizar el usuario con ID ${id}: ${err.message}`
              });
            });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Ocurrió un error al obtener el usuario con ID ${id}: ${err.message}`
        });
      });
  };
  
  
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    // Busca el usuario en la base de datos
    Usuario.findByPk(id)
      .then(usuario => {
        if (!usuario) {
          res.status(404).send({
            message: `No se encontró un usuario con ID ${id}`
          });
        } else {
          // Elimina el usuario de la base de datos
          usuario.destroy()
            .then(() => {
              res.send({
                message: 'El usuario fue eliminado exitosamente'
              });
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || `Ocurrió un error al eliminar el usuario con ID ${id}`
              });
            });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Ocurrió un error al obtener el usuario con ID ${id}`
        });
      });
  };
