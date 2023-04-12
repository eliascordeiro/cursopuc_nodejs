import { insert, update, remove, loadById, loadAll, loadByIdProduto } from "./repository.mjs";
import { newAxios } from "../../lib/network.mjs";

export async function saveRegister(values) {
    console.log(values);

    const axios = newAxios();

    const id = values.cliente[0].id

    if (!id) {
        let listSpring = values.cliente[0];
        listSpring["product"] = values.produtos;

        //salva na api springboot
        const saveSpring = await axios({
               method: 'post',
               url: 'http://localhost:4040/musicserver/api/clients',
               data: listSpring,
               headers: { 'Authorization': values.token }
        })

        //salva nodejs
        return insert(values);
    }
    return update(values);

}

export async function getRegister(id) {
    return loadById(id);
}

export async function getAll() {
    return loadAll();
}

export async function getProduto(id) {
    return loadByIdProduto(id);
}

export async function deleteRegister(id) {
    return remove(id);
}