const transporter = require('../models/gmail');

const enviarCorreo = async (toList, subject, htmlContent) => {
    const from = '"Se agregó como un nuevo colaborador" <dgadeaio4@gmail.com>';
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