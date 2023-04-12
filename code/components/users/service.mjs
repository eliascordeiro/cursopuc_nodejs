import { createToken } from "../../lib/security.mjs";
import { loadByCredentials, loadById, insertUser, updateUser, removeUser, authUser } from "./repository.mjs";

export async function saveUserInsert(user) {
    return insertUser(user);
}

export async function saveUserUpdate(user) {
    return updateUser(user);    
}

export async function login({username, password}) {
    const user = await loadByCredentials(username, password);
    if (user) return {
        token: createToken(user),
        ...user
    };
    return null;
}

export async function getUser(id) {
    return loadById(id);
}

export async function deleteUser(id) {
    return removeUser(id);
}

export async function loginPassword(user) {

    return authUser(user);    
    
}