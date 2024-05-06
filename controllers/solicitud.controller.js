const db = require("../models");
const Solicitud = db.solicitud;
const Colaborador = db.colaborador; // Import the Colaborador model if not already imported
const multer = require("multer");
const iconv = require("iconv-lite");
const { getFileLength } = require("../mjs/functions");

// Crea una nueva solicitud
exports.create = (req, res, next) => {
  const isValid = req.file ? validarDocumento(req) : true;
  if (!isValid) return; // Si la validación falla, se detiene el proceso

  const { cadenaDecodificada, buffer, length } = req.file
    ? preparacionDocumento(req)
    : { cadenaDecodificada: null, buffer: null, length: 0 };

  if (req.body.length == 0) {
    res.status(400).send({
      message: "No puede venir sin datos",
    });
    return;
  }
  if (req.body.horaInicio === '') {
    req.body.horaInicio = null;
  }
  
  if (req.body.horaFin === '') {
    req.body.horaFin = null;
  }
  Solicitud.create({
    ...req.body,
    comprobante: buffer,
    tamanio: length,
    nombreArchivo: cadenaDecodificada,
  })
    .then((data) => {
      res.status(200).send({
        message: `Agregada correctamente la solicitud de ${req.body.nombreColaborador}`,
        data: data,
      });
      req.id = data.idSolicitud;
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear la solicitud.",
      });
    });
};

exports.findAll = (req, res, next) => {
  //en Express.js toman dos argumentos: req (la solicitud) y res (la respuesta).
  Solicitud.findAll({
    include: [
      {
        model: Colaborador,
        as: "colaborador",
        attributes: {
          exclude: ["fotoCarnet", "comprobante", "nombreArchivo", "tamanio"], // Excluir varios campos del modelo Colaborador
        },
      },
    ],
    attributes: {
      exclude: ["comprobante", "nombreArchivo", "tamanio"], // Excluir campos adicionales de la Solicitud
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener las solicitudes.",
      });
    });
};

exports.findAllBySupervisor = (req, res, next) => {
  const idSupervisor = req.params.id; // Supongamos que recibes el ID del supervisor desde el front-end

  Solicitud.findAll({
    include: [
      {
        model: Colaborador,
        as: "colaborador",
        attributes: {
          exclude: ["fotoCarnet"],
        },
        where: {
          idColaborador_fk: idSupervisor,
        },
      },
    ],
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener las solicitudes.",
      });
    });
};

// Obtiene una solicitud por ID
exports.findOne = (req, res, next) => {
  const id = req.params.id;

  Solicitud.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `No se encontró una solicitud con ID ${id}`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Ocurrió un error al obtener la solicitud con ID ${id}`,
      });
    });
};

// Actualiza una solicitud por ID
exports.update = (req, res, next) => {
  const id = req.params.id;

  const isValid = req.file ? validarDocumento(req) : true;
  if (!isValid) return; // Si la validación falla, se detiene el proceso

  const { cadenaDecodificada, buffer, length } = req.file
    ? preparacionDocumento(req)
    : { cadenaDecodificada: null, buffer: null, length: 0 };
    
    if (req.body.horaInicio === '') {
      req.body.horaInicio = null;
    }
    
    if (req.body.horaFin === '') {
      req.body.horaFin = null;
    }
  // Busca la solicitud en la base de datos
  Solicitud.findByPk(id)
    .then((solicitud) => {
      if (!solicitud) {
        res.status(404).send({
          message: `No se encontró una solicitud con ID ${id}`,
        });
      } else {
        req.datos = { ...solicitud.get() };
        // Actualiza la solicitud con los nuevos datos del cuerpo de la solicitud
        solicitud
          .update({
            ...req.body,
            comprobante: buffer,
            tamanio: length,
            nombreArchivo: cadenaDecodificada,
          })
          .then(() => {
            res.status(200).send({
              message: `Actualizada correctamente la solicitud con ID ${id}`,
              solicitud: solicitud,
            });
            next();
          })
          .catch((err) => {
            res.status(500).send({
              message: `Ocurrió un error al actualizar la solicitud con ID ${id}: ${err.message}`,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Ocurrió un error al obtener la solicitud con ID ${id}: ${err.message}`,
      });
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;

  // Busca la solicitud en la base de datos
  Solicitud.findByPk(id)
    .then((solicitud) => {
      if (!solicitud) {
        res.status(404).send({
          message: `No se encontró una solicitud con ID ${id}`,
        });
      } else {
        req.datos = { ...solicitud.get() };
        // Elimina la solicitud de la base de datos
        solicitud
          .destroy()
          .then(() => {
            res.send({
              message: "La solicitud fue eliminada exitosamente",
            });
            next();
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                `Ocurrió un error al eliminar la solicitud con ID ${id}`,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Ocurrió un error al obtener la solicitud con ID ${id}`,
      });
    });
};

exports.getAllSolicitudesPorColaborador = (req, res, next) => {
  const colaboradorId = req.params.id;

  Solicitud.findAll({
    where: { idColaborador: colaboradorId },
    include: [{ model: Colaborador, as: "colaborador" }],
  })
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send({
          message: "No se encontraron solicitudes para este colaborador",
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al obtener las solicitudes del colaborador.",
      });
    });
};

const validarDocumento = (req) => {
  if (!req.file || req.file.length === 0) {
    return res.status(400).send({
      status: "400",
      message: "No ha seleccionado ningún archivo...",
    });
  }

  const allowedMimeTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/gif",
  ];
  const uploadedFile = req.file;

  if (!allowedMimeTypes.includes(uploadedFile.mimetype)) {
    return res.status(400).send({
      status: "400",
      message:
        "El archivo seleccionado no es válido. Sólo se admiten archivos PDF o imágenes.",
    });
  }

  return true;
};

const preparacionDocumento = (req) => {
  const file = req.file;
  const { originalname, buffer } = file;
  const cadenaDecodificada = iconv.decode(
    Buffer.from(originalname, "latin1"),
    "utf-8"
  );
  const length = getFileLength(buffer.length);
  return { cadenaDecodificada, buffer, length };
};

exports.getFileById = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await Solicitud.findByPk(id, {
      attributes: ["nombreArchivo", "comprobante", "tamanio"], // Selecciona los campos necesarios
    });

    if (!solicitud) {
      return res.status(404).send({
        message: "Solicitud no encontrada",
      });
    }

    if (solicitud.nombreArchivo===null) {
      return res.status(500).send({
        message: "El nombre del archivo no está disponible",
      });
    }else{

    // Establece el tipo de contenido según la extensión del archivo
    let contentType = "application/octet-stream"; // Por defecto, tipo binario
    const fileExtension = solicitud.nombreArchivo
      .split(".")
      .pop()
      .toLowerCase();

    if (fileExtension === "pdf") {
      contentType = "application/pdf";
    } else if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      contentType = `image/${fileExtension}`;
    }

    // Establece las cabeceras de respuesta
    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${solicitud.nombreArchivo}"`
    );
    res.send(solicitud.comprobante);
  }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
  
};
