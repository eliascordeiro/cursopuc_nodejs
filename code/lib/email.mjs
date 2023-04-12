import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.consigexpress.com.br',
    port: 587,
    secure: false,
    auth: {
        user: 'consigexpress@consigexpress.com.br',
        pass: 'd24m07@!'
    },
});

export default transporter;