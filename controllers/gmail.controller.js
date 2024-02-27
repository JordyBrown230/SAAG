const transporter = require('../models/gmail');
// funcion global para enviar correos desde cualquier controller
const enviarCorreo = async (toList, subject, htmlContent, fromt) => {
    const from = fromt;  // este es el correo que envia ya que no tenemos uno de la empresa por ende es uno mio
    // Verifica si toList es una cadena (un solo correo) o una matriz (varios correos)
    const destinatarios = Array.isArray(toList) ? toList.join(', ') : toList;
    console.log(destinatarios);
    try {
        await transporter.sendMail({
            from: from,
            to: destinatarios,
            subject: subject,
            html: htmlContent,
        });
        console.log("Correo enviado a:", destinatarios);
    } catch (error) {
        console.error("Error al enviar el correo:", error);
    }
}

module.exports = enviarCorreo;