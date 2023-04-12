import { prisma } from '../../lib/database.mjs';
import { Prisma } from '@prisma/client';

const nameTable = 'montadores';

async function getFields() {
    let table = nameTable.charAt(0).toUpperCase() + nameTable.slice(1);
    let schema = Prisma.dmmf.datamodel.models.find(model => model.name === table).fields;
    let data = {};
    for (const key in schema) {
        data[schema[key].name] = true;
    }
    return data;
}

const FIELDS = await getFields();

export const loadById = async (id) =>
    await prisma[nameTable].findUnique({
        where: { id },
        select: FIELDS
    });

export const loadAll = async () =>
    await prisma[nameTable].findMany({
        select: FIELDS
    });


export async function insert(values) {
    const data = {};
    const fields = Object.keys(FIELDS);

    for (const items in fields) {
        if (fields[items] === 'id') continue;

        let i = fields[items];
        data[i] = values[i];
    }

    delete data.clientes 
    delete data.produtos 
    data.empresas = { connect: [{ id: values.typesId }] };

    const saved = await prisma[nameTable].create({
        data: data
    });

    return saved;
}

export async function update(values) {
    const data = {};
    const id = parseInt(values.id);

    const fields = Object.keys(FIELDS);

    for (const items in fields) {
        if (fields[items] === 'id') continue;
        let i = fields[items];
        data[i] = values[i];
    }

    delete data.clientes 
    delete data.produtos 
    data.empresas = { connect: [{ id: values.typesId }] };

    const saved = await prisma[nameTable].update({
        where: {
            id: id,
        },
        data: data
    });

    return saved;
}

export async function remove(id) {
    const deleted = await prisma[nameTable].delete({
        where: {
            id: id,
        },
    })
    return deleted;
}