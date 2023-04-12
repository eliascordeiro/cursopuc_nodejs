import { newAxios } from "../../lib/network.mjs";

export async function requestCep(cep) {
    const axios = newAxios();
    const searchCep = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);

    if (searchCep.status !== 200) return { mensagem: 'Cep inválido' };

    return searchCep.data;
}