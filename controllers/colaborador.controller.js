    const transporter = require('./gmail.controller');
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
            const toList = [req.body.correoElectronico];
            const subject = "Nuevo colaborador";
            const htmlContent = `
                <h2>muestra</h2>
                </br><p>se ha agregado un nuevo colaborador con los siguientes datos.</p> </br> nombre: ${req.body.nombre}
                </br></br> correo: ${req.body.correoElectronico}`;
            await Promise.all([
                exports.enviarCorreo(toList, subject, htmlContent),
                res.status(200).send({
                    message: `Agregado correctamente el colaborador ${req.body.nombre}`,
                    data: nuevoColaborador
                })
            ]);
        } catch (error) {
            res.status(500).send({
                message: error.message || 'Ocurrió un error al crear el colaborador.'
            });
        }
    };
    

    exports.findAllColaboradores = (req, res) => {
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

    exports.findOneColaborador = (req, res) => {
        const id = req.params.id;
    
        Colaborador.findByPk(id)
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `No se encontró un colaborador con ID ${id}`
            });
            } else {
            res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
            message: `Ocurrió un error al obtener el colaborador con ID ${id}`
            });
        });
    };

    exports.updateColaborador = (req, res) => {
        const id = req.params.id;
    
        Colaborador.findByPk(id)
        .then(colaborador => {
            if (!colaborador) {
            res.status(404).send({
                message: `No se encontró un colaborador con ID ${id}`
            });
            } else {
            colaborador.update(req.body)
                .then(() => {
                res.status(200).send({
                    message: `Actualizado correctamente el colaborador con ID ${id}`,
                    colaborador: colaborador
                });
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

    exports.deleteColaborador = (req, res) => {
        const id = req.params.id;
    
        Colaborador.findByPk(id)
        .then(colaborador => {
            if (!colaborador) {
            res.status(404).send({
                message: `No se encontró un colaborador con ID ${id}`
            });
            } else {
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
    
        exports.enviarCorreo = async (toList, subject, htmlContent)=> {
            const from = '"Se agrego como un nuevo colaborador" <dgadeaio4@gmail.com>';
            console.log(toList);
        try {
            await transporter.sendMail({
                from: from,
                to: toList,
                subject: subject,
                html: htmlContent,
            });
            console.log("Correo enviado a:", toList);
        } catch (error) {
            console.error("Error al enviar el correo:", error);
        }
        }