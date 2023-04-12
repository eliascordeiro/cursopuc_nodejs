import { prisma } from '../../lib/database.mjs';
import bcrypt from 'bcrypt';

const USER_FIELDS = {
    id: true,
    username: true,
    name: true,
    email: true,
    types: true,
    roles: true,
    password: false,
    typesId: true
}

async function requestEmpresas(user) {
    return await prisma.empresas
        .findUnique({
            where: {
                email: user.email,
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
                email: user.email,
            },
            select: {
                id: true,
                nome: true
            }
        });
}

async function requestFullData(user) {
    const result = {};

    const [empresas, montadores] = await Promise.all([requestEmpresas(user), requestMontadores(user)]);

    if (empresas === null && montadores === null) return null;

    const conteudo = empresas !== null ? 'EMPRESA' : 'MONTADOR';

    result[conteudo] = conteudo === 'EMPRESA' ? empresas.id : montadores.id;
    result['nome'] = conteudo === 'EMPRESA' ? empresas.nome : montadores.nome;

    return result;
}

export async function insertUser(user) {
    let getResult;

    await requestFullData(user)
        .then(response => {
            getResult = response
        })

    if (getResult === null) {
        return { 'Result': 'E-mail não encontrado' };
    }

    const tipo = Object.keys(getResult)[0];

    const username = user.username;
    const name = getResult.nome;
    const email = user.email;
    const typesId = getResult[tipo];

    const role = tipo === 'EMPRESA' ? 'ADMIN' : 'USER';

    const password = await bcrypt.hash(
        user.password,
        await bcrypt.genSalt()
    );

    const saved = await prisma.user.create({
        data: {
            password,
            username,
            name,
            email,
            typesId,
            types: {
                connect: [
                    { name: tipo }
                ]
            },
            roles: {
                connect: [
                    { name: role }
                ]
            }
        }
    });

    return saved;
}

export async function updateUser(user) {

    const name = user.name;
    const username = user.username;
    const email = user.email;

    const password = await bcrypt.hash(
        user.password,
        await bcrypt.genSalt()
    );

    const saved = await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            name,
            username,
            password,
            email
        }
    });

    return saved;
}

export async function removeUser(id) {

    const deleteUser = await prisma.user.delete({
        where: {
            id: id,
        },
    })

    return deleteUser;
}

export const loadById = async (id) =>
    await prisma.user.findUnique({
        where: { id },
        select: USER_FIELDS
    });


export async function loadByCredentials(username, password) {
    const user = await prisma.user
        .findUnique({
            where: { username },
            select: {
                ...USER_FIELDS,
                password: true
            }
        });
    if (!user) return null;

    if (!await bcrypt.compare(password, user.password)) {
        return null;
    }

    delete user.password;

    return user;
}

export async function authUser(data) {
    const user = await prisma.user
        .findUnique({
            where: { id: data.id },
            select: {
                ...USER_FIELDS,
                password: true
            }
        });
    if (!user) return null;

    if (!await bcrypt.compare(data.password, user.password)) {
        return null;
    }

    delete user.password;
    return user;
}