const db = require('../models');
const Usuario = db.usuarios;

exports.create = (req, res) =>{
    if(!req.body.descripcion){
    res.status(400).send({
        message: 'Los datos del usuario no pueden estar vacios'
    });
    return;
    }
    const usuario = {
        descripcion: req.body.descripcion
    };
    Usuario.create(usuario)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || 'Ha ocurrido un error al guardar los datos del ususario'
        });
    });
};

    exports.findAll = (req, res ) => {
        Usuario.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || 'Ha ocurrido un error al obtener los usuarios almacenados'
            });
        });
    };

    exports.findOne = (req, res) =>{
    const id = req.params.id;
    Usuario.findByPk(id)
    .then(data =>{
        if (!data){
            res.status(404).send({
                message: `No se encontro ningun usuario con la cedula ${id}`
            });
        } else {
            res.send(data);
        }
    })
    .catch (err =>{
        res.status(500).send({
            message: `Ha ocurrido un error al obtener el usuario con la cedula numero: ${id}`
        })
    });
    };

    exports.update = (req, res) => {
        const cedulaId = req.params.cedulaId;
    Usuario.findByPk(cedulaId)
    .then(usuario => {
        if(!usuario){
        res.status(404).send({
            message: `No se ha encontado ningun usuario con el numero de cedula ${cedulaId}`
        });
    } else {
        usuario.descripcion = req.body.descripcion
        usuario.save()
        .then(()=>{
            res.send(usuario);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || `Ha ocurrido un error al actualizar los datos del usuario con el numero de cedula: ${cedulaId}`
            });
        });
    }
    })
    .catch(err => {
        res.status(500),send({
            message:
            err.message || `Ha ocurrido un error al obtener los datos del usuario con la cedula: ${cedulaId}`
        });
    });
};

exports.delete = (req, res) => {
    const cedulaId = req.params.cedulaId;

    Usuario.findByPk(cedulaId)
    .then(usuario => {
        if(!usuario){
        res.status(404).send({
            message: `No se encontro ningun usuario con la cedula ${cedulaId}`
        });
    } else {
        usuario.destroy()
        .then(() =>{
            res.send({
                message: 'El usuario ha sido eliminado correctamente'
            });
        })
        .catch(err =>{
            res.status(500).send({
                message:
                err.message || `Ha ocurrido un error al eliminar los datos del usuario con la cedula ${cedulaId}`
            })
        })
    }
    })
    .catch(err =>{
        res.status(500).send({
            message: `Ha ocurrido un error al obtener los datos del usuario con la cedula ${cedulaId}`
        });
    });
};