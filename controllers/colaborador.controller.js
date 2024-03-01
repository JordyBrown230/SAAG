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
            const from = '"Se agregó como un nuevo colaborador" <dgadeaio4@gmail.com>';
            const toList = [req.body.correoElectronico];  // el otro correo es de prueba para ver si se puede hacer con mas de uno, tienen que cambiarlo, ademas de que eso hace que se cree una lista de correos
            const subject = "Nuevo colaborador";// agregar los correos necesarios para notificar de los nuevos colaboradores 
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
            await enviarCorreo(toList, subject, htmlContent, from);  // forma de utilizar la funcion global
    
            res.status(200).send({
                message: `Agregado correctamente el colaborador ${req.body.nombre}`,
                data: nuevoColaborador
            });
            next();
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
    // Funcion IIEF la que permite verificar cada cierto tiempo cualquier cosa, espero lo de los docuemtos para agregar la funcion para verificar fechas de vencimiento
    (async () => {
        console.log('Se envió'); // Verificación de carga del archivo
        try {
            const nombresCumpleanierosHoy = (colaboradores) => {  // estraemos los colaboradores que cumplen  años
                const hoy = new Date();
                return colaboradores
                    .filter(colaborador => {
                        const fechaNacimiento = new Date(colaborador.fechaNacimiento);
                        console.log(fechaNacimiento.getDay());
                        console.log(fechaNacimiento.getDate());
                        return (fechaNacimiento.getDate() + 1) === hoy.getDate() && fechaNacimiento.getMonth() === hoy.getMonth();
                    })
                    .map(colaborador => colaborador.nombre);
            };            
    
            const enviarCorreoCumpleanieros = async () => {
                const colaboradores = await Colaborador.findAll(); // Se obtienen todos los colaboradores
                const nombresCumpleanieros = nombresCumpleanierosHoy(colaboradores);
    
                // Verificar si hay cumpleañeros hoy
                if (nombresCumpleanieros.length === 0) {
                    console.log('No hay cumpleañeros hoy');
                    return;
                }
    
                const listaCorreos = colaboradores.map(colaborador => ({  // recuperamos todos los colaboradores y buscamos que se envien los mensajes
                    correo: colaborador.correoElectronico,
                    mensaje: nombresCumpleanieros.includes(colaborador.nombre)   // seleccion de mensaje a mostrar segun si esta de cumpleaños o no
                        ? `<h2>¡Feliz Cumpleaños, ${colaborador.nombre}!</h2><p>Queremos desearte un día lleno de alegría y felicidad en tu cumpleaños. ¡Que todos tus deseos se hagan realidad!</p>`
                        : `<h2>¡Celebramos juntos!</h2>
                        <p>Hoy es un día especial, ¡celebramos el cumpleaños de algunos de nuestros colaboradores! Te invitamos a unirte a nosotros en esta celebración:</p>
                        <ul>
                            ${nombresCumpleanieros.map(nombre => `<li>${nombre}</li>`).join('')}
                        </ul>
                        `
                }));

                const from = "Informacion relevante";
    
                for (const { correo, mensaje } of listaCorreos) {
                    await enviarCorreo([correo], '¡Feliz Cumpleaños!', mensaje, from); // Llamar a la función de envío de correos para enviar la notificación
                }
    
                console.log('Correos enviados correctamente');
            };
    
            const ejecutarFuncionDiaria = (hora, minuto, funcion) => {  // definicion horaria para asignar al siguiente dia
                const ahora = new Date();
                let horaDeseada = new Date(
                    ahora.getFullYear(),
                    ahora.getMonth(),
                    ahora.getDate(),
                    hora,
                    minuto,
                    0,
                    0
                );
            
                if (ahora > horaDeseada) {
                    // Si la hora deseada ya pasó hoy, programarla para mañana
                    console.log('Programar la siguiente ejecución para:', horaDeseada);
                    horaDeseada.setDate(horaDeseada.getDate() + 1);      // asignacion para el siguiente dia
                }
            
                // Calcular el tiempo restante para la próxima ejecución
                const tiempoParaEjecutar = horaDeseada - ahora;
            
                // Programar la ejecución de la función usando setTimeout
                setTimeout(() => {
                    funcion();
                    // Programar la siguiente ejecución para cierta hora
                    ejecutarFuncionDiaria(hora, minuto, funcion);
                }, tiempoParaEjecutar);
            };
            
    
            // Configurar la hora y el minuto deseados para enviar el correo
            const horaDeseada = 15; // 03:00 AM la mejor hora para hacerlo
            const minutoDeseado = 10;
    
            // Ejecutar la función una vez al día a la hora deseada
            ejecutarFuncionDiaria(horaDeseada, minutoDeseado, enviarCorreoCumpleanieros);
        } catch (error) {
            console.error('Ocurrió un error:', error.message);
        }
    })();
    