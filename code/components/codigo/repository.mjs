import transporter from '../../util/email.mjs';
import { prisma } from '../../lib/database.mjs';

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    );
}

async function requestEmpresas(user) {
    return await prisma.empresas
        .findUnique({
            where: {
                email: user.email
            },
            select: {
                id: true,
                nome: true
            }
        });

}

async function requestMontadores(user) {
    return await prisma.montadores
        .findUnique({
            where: {
                email: user.email
            },
            select: {
                id: true,
                nome: true
            }
        });
}

async function requestUsers(user) {
    return await prisma.user
        .findUnique({
            where: {
                email: user.email
            },
            select: {
                id: true,
                name: true,
                username: true
            }
        });
}

async function requestFullData(email) {
    const [empresas, montadores, users] = await Promise.all([requestEmpresas(email), requestMontadores(email), requestUsers(email)]);

    if (empresas === null && montadores === null) return null;

    const result = users === null ? 
    {'user': 'not found', 'name' : empresas ? empresas.nome : montadores.nome} :
    { 'id': users.id, 'name': users.name, 'username': users.username }

    return result;
}

export async function enviaEmail(email) {

    let result;

    await requestFullData(email)
        .then(response => {
            result = response
        })

    if (result === null) {
        return { 'info': 'E-mail não encontrado' };
    }

    let codigo = between(10000, 99999);

    await transporter.sendMail({
        from: '<consigexpress@consigexpress.com.br>',
        to: email.email,
        subject: "Insira o código quando solicitado ✔",
        html: "<b style='font-size: 20px'> Código => " + codigo + "</b>",
    });

    return { 'codigo': codigo, 'email': email.email, 'result': result };
}