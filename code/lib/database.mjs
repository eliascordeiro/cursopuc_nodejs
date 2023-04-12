import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const prisma = new PrismaClient();

async function makeRole(name) {
    const exists = await prisma.role.findUnique({ where: { name } })
    if (exists) {
        console.log(`  Role ${name} found.`);
        return;
    }

    await prisma.role.create({ data: { name } });
    console.log(`  Role ${name} created!`);
}

async function makeType(name) {
    const exists = await prisma.type.findUnique({ where: { name } })
    if (exists) {
        console.log(`  Type ${name} found.`);
        return;
    }

    await prisma.type.create({ data: { name } });
    console.log(`  Type ${name} created!`);
}

async function makeAdmin() {
    const empresaExists = await prisma.empresas.findMany({});
    if (empresaExists.length === 0) {
        await prisma.empresas.create({
            data: {
                nome: 'Administrator Server',
                email: 'elias157508@gmail.com',
                telefone: '',
            }
        });
        console.log("  Empresa created!");
    }

    const username = process.env.DEFAULT_ADMIN_NAME;
    const password = await bcrypt.hash(
        process.env.DEFAULT_ADMIN_PWD,
        await bcrypt.genSalt()
    );

    const exists = await prisma.user.findFirst({
        where: {
            roles: {
                some: {
                    name: 'ADMIN'
                }
            }
        }
    });
    if (exists) {
        console.log(`  Administrator found.`);
        return;
    }

    await prisma.user.create({
        data: {
            username,
            password,
            name: 'Administrator Server',
            email: 'elias157508@gmail.com',
            typesId: 1,
            types: {
                connect: [
                    { name: 'EMPRESA' }
                ]
            },
            roles: {
                connect: [
                    { name: 'ADMIN' }
                ]
            }
        }
    });
    console.log("  Default administrator created!");
}

export async function bootstrapDb() {
    console.log("Checking initial data...");
    await makeRole('ADMIN');
    await makeRole('USER');
    await makeType('EMPRESA');
    await makeType('MONTADOR');
    await makeAdmin();
    console.log("Done!");
}
