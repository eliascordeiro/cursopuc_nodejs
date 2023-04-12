import { insert, update, remove, loadById, loadAll } from "./repository.mjs";

export async function saveRegister(values) {
    if (!values.id) {
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

export async function deleteRegister(id) {
    return remove(id);
}