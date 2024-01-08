import { transporter } from '../middlewares/gmail.middleware';
const Colaborador = db.colaborador;

export class EnvioMail {
    static enviarMail = async (from, toList, subject, htmlContent) => {
        try {
            await transporter.sendMail({
                from: from,
                to: toList.join(', '),  // Convierte la lista a una cadena separada por comas
                subject: subject,
                html: htmlContent,
            });
            console.log("Correo enviado a:", toList);
        } catch (error) {
            console.error("Error al enviar el correo:", error);
        }
    };
}

// FORMA DE IMPLEMENTAR
/*
const from = '"lo que quieran poner" <dgadeaio4@gmail.com>';
const toList = ['correo1@example.com', 'correo2@example.com', 'correo3@example.com']; // se puede aumentar la lista las veces que se quieran o solo se envia uno como se desee
const subject = "lo que se deba poner";
const htmlContent = `
    <h2>Test</h2>
    </br><p>Este es un mensaje personalizado para ti.</p>`;

EnvioMail.enviarMail(from, toList, subject, htmlContent);

*/