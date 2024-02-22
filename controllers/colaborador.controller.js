    const enviarCorreo = require('./gmail.controller')   // instancia de la funcion enviar correo 
    const db = require('../models');
    const Colaborador = db.colaborador;
    const Usuario = db.usuario;
  
    exports.createColaborador = async (req, res) => {
        try {
            if (Object.keys(req.body).length === 0) {
                return res.status(400).send({
                    message: 'No puede venir sin datos'
                });
            }
            const nuevoColaborador = await Colaborador.create(req.body);
            //datos que se vana a necesitar, basicamente definimos correos y demas
            const toList = [req.body.correoElectronico, "darwinjavisilva@gmail.com"];  // el otro correo es de prueba para ver si se puede hacer con mas de uno, tienen que cambiarlo, ademas de que eso hace que se cree una lista de correos
            const subject = "Nuevo colaborador";
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
                <h2>Informacion del nuevo colaborador</h2>
                <table>
                    <tr>
                        <th>Información</th>
                        <th>Datos</th>
                    </tr>
                    <tr>
                        <td>Nombre:</td>
                        <td>${req.body.nombre}</td>
                    </tr>
                    <tr>
                        <td>Correo:</td>
                        <td>${req.body.correoElectronico}</td>
                    </tr>
                </table>
            `;
            await enviarCorreo(toList, subject, htmlContent);  // forma de utilizar la funcion global
    
            res.status(200).send({
                message: `Agregado correctamente el colaborador ${req.body.nombre}`,
                data: nuevoColaborador
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || 'Ocurrió un error al crear el colaborador.'
            });
        }
    };
    
    exports.findAllColaboradores = async (req, res) => {
        Colaborador.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || 'Ocurrió un error al obtener los colaboradores.'
            });
        });
    };

    exports.findOneColaborador = async (req, res) => {
        const id = req.params.id;
    
        Colaborador.findByPk(id)
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `No se encontró un colaborador con ID ${id}`
            });
            } else {
            res.send(data);
            next();
            }
        })
        .catch(err => {
            res.status(500).send({
            message: `Ocurrió un error al obtener el colaborador con ID ${id}`
            });
        });
    };

    exports.updateColaborador = async (req, res) => {
        const id = req.params.id;
    
        Colaborador.findByPk(id)
        .then(colaborador => {
            if (!colaborador) {
            res.status(404).send({
                message: `No se encontró un colaborador con ID ${id}`
            });
            } else {

            req.datos = {...colaborador.get()};

            colaborador.update(req.body)
                .then(() => {
                res.status(200).send({
                    message: `Actualizado correctamente el colaborador con ID ${id}`,
                    colaborador: colaborador
                });
                next();
                })
                .catch(err => {
                res.status(500).send({
                    message: `Ocurrió un error al actualizar el colaborador con ID ${id}: ${err.message}`
                });
                });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: `Ocurrió un error al obtener el colaborador con ID ${id}: ${err.message}`
            });
        });
    };

    exports.deleteColaborador = async (req, res) => {
        const id = req.params.id;
    
        Colaborador.findByPk(id)
        .then(colaborador => {
            if (!colaborador) {
            res.status(404).send({
                message: `No se encontró un colaborador con ID ${id}`
            });
            } else {

            req.datos = {...colaborador.get()};

            colaborador.destroy()
                .then(() => {
                res.send({
                    message: 'El colaborador fue eliminado exitosamente'
                });
                })
                .catch(err => {
                res.status(500).send({
                    message: err.message || `Ocurrió un error al eliminar el colaborador con ID ${id}`
                });
                next();
                });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: `Ocurrió un error al obtener el colaborador con ID ${id}`
            });
        });
    };

    
    exports.findColaboradoresSinUsuario = async (req, res) => {
        try {
        // Obtener todos los colaboradores
        const colaboradores = await Colaborador.findAll();
    
        // Obtener todos los usuarios y extraer los id de colaborador
        const usuarios = await Usuario.findAll();
        const idsColaboradoresConUsuario = usuarios.map(usuario => usuario.idColaborador);
    
        // Filtrar colaboradores que no tienen usuario asignado
        const colaboradoresSinUsuario = colaboradores.filter(colaborador => !idsColaboradoresConUsuario.includes(colaborador.idColaborador));
    
        if (colaboradoresSinUsuario.length === 0) {
            return res.status(404).send({
            message: 'No se encontraron colaboradores sin usuario asignado',
            });
        }
    
        return res.send(colaboradoresSinUsuario);
        } catch (error) {
        return res.status(500).send({
            message: `Ocurrió un error al obtener los colaboradores sin usuario: ${error.message}`,
        });
        }
    };
    