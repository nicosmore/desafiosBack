const envConfig = require('../config/env.config');
const nodemailer  = require('nodemailer');

const TEST_MAIL = envConfig.TEST_MAIL;
const PASSWORD_MAIL = envConfig.PASSWORD_MAIL;

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: PASSWORD_MAIL
    }
});

const sendmail = async (usuario) => {
    try {
        const mailPayload = {
            from: 'Servidos Node.js',
            to: TEST_MAIL,
            subject: 'Usuario nuevo registrado',
            html: `<p>Usuario ${usuario} se registro correctamente</p>`
        };

        const mailResponse = await transporter.sendMail(mailPayload);
        console.log(mailResponse);
    } catch (error) {
        console.log(error.message);        
    }
}

module.exports = {sendmail};

