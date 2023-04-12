import { enviaEmail } from "./repository.mjs";

export async function codeEmail(email) {
    return enviaEmail(email);
}

