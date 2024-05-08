const enviarCorreo = require('./gmail.controller')   // instancia de la funcion enviar correo
const db = require('../models');
const Solicitud = db.solicitud;
const Colaborador = db.colaborador; // Import the Colaborador model if not already imported

// Crea una nueva solicitud
exports.create = async (req, res, next) => {
  try {
    if (req.body.length == 0) {
      return res.status(400).send({
        message: 'No puede venir sin datos'
      });
    }

    // Crea una nueva solicitud
    const data = await Solicitud.create(req.body);

    // Enviar correo electrónico
    const subject = "Solicitud de nuevo colaborador";

    // Obtener información del colaborador
    const colaborador = await Colaborador.findByPk(req.body.idColaborador);

    // Obtener información del supervisor
    const supervisor = await Colaborador.findByPk(colaborador.idColaborador_fk);

    // Definir destinatarios
    const toList = [colaborador.correoElectronico, supervisor.correoElectronico];

    const from = '"Se agregó como una nueva solicitud" <dgadeaio4@gmail.com>';
    const htmlContent = `
      <style>
        h2 {
          color: #333;
          border-bottom: 2px solid #333;
          padding-bottom: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
      <h2>Informacion de la nueva solicitud</h2>
      <table>
        <tr>
          <th>Información</th>
          <th>Datos</th>
        </tr>
        <tr>
          <td>Nombre del Colaborador:</td>
          <td>${req.body.nombreColaborador}</td>
        </tr>
        <tr>
          <td>Salario con goce:</td>
          <td>${req.body.conGoceSalarial}</td>
        </tr>
        <tr>
          <td>Tipo de solicitud:</td>
          <td>${req.body.tipoSolicitud}</td>
        </tr>
        <tr>
          <td>Encargado:</td>
          <td>${req.body.nombreEncargado}</td>
        </tr>
        <tr>
          <td>Tiempo:</td>
          <td>${req.body.horaInicio} - ${req.body.horaFin}</td>
        </tr>
      </table>
    `;
    await enviarCorreo(toList, subject, htmlContent, from);
    // Enviar respuesta al cliente una vez que todo esté completado
    res.status(200).send({
      message: `Agregada correctamente la solicitud de ${req.body.nombreColaborador}`,
      data: data
    });
  } catch (err) {
    console.error(err); // Registrar el error en la consola o en un sistema de registro de errores
    res.status(500).send({
      message: err.message || 'Ocurrió un error al crear la solicitud.'
    });
  }
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
          .then(async () => {
            res.status(200).send({
              message: `Actualizada correctamente la solicitud con ID ${id}`,
              solicitud:solicitud
            }); 
            next();   
            const from = '"Se ha Actualizado la Solicitud numero: "'+`${req.body.idSolicitud}`;
            console.log(req.body.idColaborador);
            const toList = [req.body.nombreColaborador];
            const subject = "Actualizacion de solicitud";
            const htmlContent = `
                <style>
                    h2 {
                        color: #333;
                        border-bottom: 2px solid #333;
                        padding-bottom: 10px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 10px;
                    }
                    th, td {
                        padding: 10px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
                <h2>Informacion de la nueva solicitud</h2>
                <table>
                    <tr>
                        <th>Información</th>
                        <th>Datos</th>
                    </tr>
                    <tr>
                        <td>nombre del Colaborador:</td>
                        <td>${req.body.nombreColaborador}</td>
                    </tr>
                    <tr>
                        <td>salario :</td>
                        <td>${req.body.conGoceSalarial}</td>
                    </tr>
                    <tr>
                        <td>Solicitud de tipo:</td>
                        <td>${req.body.tipoSolicitud}</td>
                    </tr>
                    <tr>
                        <td>Estado de la Solicitud:</td>
                        <td>${req.body.estado}</td>
                    </tr>
                    <tr>
                        <td>Tiempo:</td>
                        <td>${req.body.fechaInicio} - ${req.body.fechaFin}</td>
                    </tr>
                </table>
            `;
              await enviarCorreo(toList, subject, htmlContent, from);  
          })
          .catch(err => {
            res.status(500).send({
              message: `Ocurrió un error al actualizar la solicitud con ID ${id}: ${err.message}`
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

