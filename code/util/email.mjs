import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'insira_host_smtp',
    port: 587,
    secure: false,
    auth: {
        user: 'user_email_smtp',
        pass: 'password_smtp'
    },
});

export default transporter;