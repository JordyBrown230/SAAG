    const db = require('../models');
    const Usuario = db.usuarios;

    const handleSuccess = (res, data) => {
    return res.status(200).json(data);
    };

    const handleError = (res, status, message) => {
    return res.status(status).json({ message });
    };

    exports.create = (req, res) => {
    const usuario = req.body;
    if (!usuario) return handleError(res, 400, 'Los datos del usuario no pueden estar vacíos');

    Usuario.create(usuario)
        .then((createdUsuario) => {
        return handleSuccess(res, createdUsuario);
        })
        .catch((error) => {
        console.error(error);
        return handleError(res, 500, 'Ha ocurrido un error al guardar los datos del usuario');
        });
    };

    exports.findAll = (req, res) => {
    Usuario.findAll()
        .then((usuarios) => {
        return handleSuccess(res, usuarios);
        })
        .catch((error) => {
        console.error(error);
        return handleError(res, 500, 'Ha ocurrido un error al obtener los usuarios almacenados');
        });
    };

    exports.findOne = (req, res) => {
    const id = req.params.id;
    Usuario.findByPk(id)
        .then((usuario) => {
        if (!usuario) return handleError(res, 404, `No se encontró ningún usuario con la cédula ${id}`);
        return handleSuccess(res, usuario);
        })
        .catch((error) => {
        console.error(error);
        return handleError(res, 500, `Ha ocurrido un error al obtener el usuario con la cédula número: ${id}`);
        });
    };

    exports.update = (req, res) => {
    const id = req.params.id;
    Usuario.findByPk(id)
        .then((usuario) => {
        if (!usuario) return handleError(res, 404, `No se ha encontrado ningún usuario con el número de cédula ${id}`);
        usuario = { ...usuario, ...req.body };
        return usuario.save();
        })
        .then((updatedUsuario) => {
        return handleSuccess(res, updatedUsuario);
        })
        .catch((error) => {
        console.error(error);
        return handleError(res, 500, `Ha ocurrido un error al actualizar los datos del usuario con la cédula: ${id}`);
        });
    };

    exports.delete = (req, res) => {
    const id = req.params.id;
    Usuario.findByPk(id)
        .then((usuario) => {
        if (!usuario) return handleError(res, 404, `No se encontró ningún usuario con la cédula ${id}`);
        return usuario.destroy();
        })
        .then(() => {
        return handleSuccess(res, 'El usuario ha sido eliminado correctamente');
        })
        .catch((error) => {
        console.error(error);
        return handleError(res, 500, `Ha ocurrido un error al eliminar los datos del usuario con la cédula ${id}`);
        });
    };
