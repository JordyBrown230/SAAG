const transporter = require('../models/gmail');
// funcion global para enviar correos desde cualquier controller

const enviarCorreo = async (toList, subject, htmlContent, fromt) => {
    console.log("esta enviando correos");
    const from = fromt;  // este es el correo que envia ya que no tenemos uno de la empresa por ende es uno mio
    // Verifica si toList es una cadena (un solo correo) o una matriz (varios correos)
    const destinatarios = Array.isArray(toList) ? toList.join(', ') : toList;
    try {
        await transporter.sendMail({    //estructura de los correos 
            from: from,
            to: destinatarios,
            subject: subject,
            html: htmlContent,
        });
        console.log("Correo enviado a:", destinatarios);   // verificacion del envio
    } catch (error) {
        console.error("Error al enviar el correo:", error);
    }
}

module.exports = enviarCorreo;