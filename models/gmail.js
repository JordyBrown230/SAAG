const nodemailer = require('nodemailer');
require('dotenv').config();

const { GM_MAIL, GM_PASS, GM_HOSTED, GM_PORTMAIL } = process.env;

const transporter = nodemailer.createTransport({
    host: GM_HOSTED,
    port: GM_PORTMAIL,
    secure: true,
    auth: {
        user: GM_MAIL,
        pass: GM_PASS,
    },
});

module.exports = transporter;