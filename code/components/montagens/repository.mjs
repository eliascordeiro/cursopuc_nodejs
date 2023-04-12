import { prisma } from '../../lib/database.mjs';
import { Prisma } from '@prisma/client';

const nameTable = 'cliente';

async function getFields(table) {
    let nameTable = table.charAt(0).toUpperCase() + table.slice(1);

    //extrai propriedades da query prisma
    let schema = Prisma.dmmf.datamodel.models.find(model => model.name === nameTable).fields;
    let data = {};

    for (const key in schema) {
        data[schema[key].name] = true;
    }
    return data;
}

const FIELDS = await getFields('cliente');
const FIELDS_PRODUTO = await getFields('produto');

export const loadById = async (id) =>
    await prisma[nameTable].findUnique({
        where: { id },
        select: FIELDS
    });

export const loadAll = async () =>
    await prisma[nameTable].findMany({
        select: FIELDS
    });

export const loadByIdProduto = async (id) =>
    await prisma.produto.findUnique({
        where: { id },
        select: FIELDS_PRODUTO
    });


export async function insert(values) {
    const data = values.cliente[0];
    const fields = Object.keys(FIELDS);

    for (const items in fields) {
        const i = fields[items];
        if (i === 'id') continue;
        data[i] = values.cliente[0][i];
    }

    data.typesId = values.cliente[0].typesId;
    data.previsao = new Date(values.cliente[0].previsao);
    data.dataCadastro = new Date(values.cliente[0].dataCadastro);
    data.empresas = values.typesId;

    const saved = await prisma.cliente.create({
        data: {
            nome: data.nome,
            cep: data.cep,
            endereco: data.endereco,
            numero: data.numero,
            bairro: data.bairro,
            cidade: data.cidade,
            uf: data.uf,
            complemento: data.complemento,
            previsao: data.previsao,
            dataCadastro: data.dataCadastro,
            montador: data.montador,
            empresas: data.empresas,
            produtos: {
                create: values.produtos,
            },
        },
    })

    return saved;
}

export async function update(values) {
    const data = values.cliente[0];

    const fields = Object.keys(FIELDS);

    for (const items in fields) {
        const i = fields[items];
        if (i === 'id') continue;
        data[i] = values.cliente[0][i];
    }

    data.typesId = values.cliente[0].typesId;
    data.previsao = new Date(values.cliente[0].previsao);
    data.dataCadastro = new Date(values.cliente[0].dataCadastro);
    data.empresas = values.typesId; 

    const saved = await prisma.cliente.update({
        where: {
            id: parseInt(data.id),
        },
        data: {
            nome: data.nome,
            cep: data.cep,
            endereco: data.endereco,
            numero: data.numero,
            bairro: data.bairro,
            cidade: data.cidade,
            uf: data.uf,
            complemento: data.complemento,
            previsao: data.previsao,
            dataCadastro: data.dataCadastro,
            montador: data.montador,
            empresas: data.empresas,
            produtos: {
                deleteMany: {},
                create: values.produtos,
            },
        },
    })

    const updated = await prisma[nameTable].findUnique({
        where: {
            id: parseInt(data.id),
        },
        select: FIELDS
    });

    return updated;
}

export async function remove(id) {

    await prisma[nameTable].update({
        data: {
            produtos: {
                deleteMany: {},
            },
        },
        where: {
            id: id,
        },
    })

    const delete_cliente = await prisma[nameTable].delete({
        where: {
            id: id,
        },
    })

    return delete_cliente;
}