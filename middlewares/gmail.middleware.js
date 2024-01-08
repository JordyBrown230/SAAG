require('dotenv').config();
import nodemailer from 'nodemailer';
//config
const {
    GM_MAIL, 
    GM_PASS,
    GM_HOSTED,
    GM_PORTMAIL
    } = process.env;

    export const transporter = nodemailer.createTransport({
        host: GM_HOSTED,
        port: GM_PORTMAIL,
        secure: true,
        auth: {
            user: GM_MAIL,
            pass: GM_PASS,
        },
    });
    
    transporter.verify()
    .then(() => {
        console.log("Correo enviado");
    })
    .catch(error => {
        console.error("Error al verificar el transporte:", error);
    });
