import { saveRegister, getRegister, deleteRegister, getAll } from "./service.mjs";

/**
 * @openapi
 * /montadores:
 *   post:
 *     summary: "Cria montadores"
 *     tags:
 *       - "montadores"
 * 
 *     operationId: create
 *     x-eov-operation-handler: montadores/routes
 *     requestBody:
 *       description: Cria registro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/create_montadores"
 *     responses:
 *       "200":
 *         description: "Operação realizada com sucesso"
 *       "400":
 *         description: "Dados incorretos"
 *       "401":
 *         description: "Usuário não autorizado"
 *     security: 
 *       - JWT: ['ADMIN','USER']
 */

export async function create(req, res, _) {
  const typesId = parseInt(req.user.typesId);
  const values = { ...req.body, typesId };

  res.status(201).json(await saveRegister(values));
}
//------------------------------------------------------------------------//

/**
 * @openapi
 * 
 * /montadores/{id}:
 *   get:
 *     summary: "Busca registro pelo ID"
 * 
 *     tags:
 *       - "montadores"
 * 
 *     operationId: profile
 *     x-eov-operation-handler: montadores/routes
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID deve ser numérico 
 * 
 *     responses:
 *       '200':
 *         description: "Operação realizada com sucesso"
 *       '404':
 *         description: "Registro não encontrado"
 *       '401':
 *         description: "Usuário não autorizado"
 *
 *     security: 
 *       - JWT: ['ADMIN','USER']
 */
export async function profile(req, res, _) {

  const montador = await getRegister(parseInt(req.params.id));

  return montador ? res.json(montador) : res.sendStatus(404);
}
//------------------------------------------------------------------------//

/**
 * @openapi
 * 
 * /montadores/me:
 *   put:
 *     summary: "Atualiza registro"
 * 
 *     tags:
 *       - "montadores"
 * 
 *     operationId: update
 *     x-eov-operation-handler: montadores/routes
 * 
 *     requestBody:
 *       description: "Atualiza dados do montador"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/update_montadores" 
 * 
 *     responses:
 *       '200':
 *         description: "Operação realizada com sucesso"
 *       '400':
 *         description: "Dados incorretos"
 *       '401':
 *         description: "Usuário não autorizado"
 *
 *     security: 
 *       - JWT: ['ADMIN','USER']
 */

export async function update(req, res, _) {
  const typesId = parseInt(req.user.typesId);
  const values = { ...req.body, typesId };

  const updated = await saveRegister(values);

  if (updated) {
    res.json(updated);
  } else {
    res.sendStatus(404);
  }

}

/**
 * @openapi
 * 
 * /montadores/{id}:
 *   delete:
 *     summary: "Remove registro pelo ID"
 * 
 *     tags:
 *       - "montadores"
 * 
 *     operationId: remove
 *     x-eov-operation-handler: montadores/routes
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID deve ser numérico 
 * 
 *     responses:
 *       '200':
 *         description: "Operação realizada com sucesso"
 *       '404':
 *         description: "Registro não encontrado"
 *       '401':
 *         description: "Usuário não autorizado"
 *
 *     security: 
 *       - JWT: ['ADMIN','USER']
 */
export async function remove(req, res, _) {
  let id = parseInt(req.params.id);

  let excluido = await deleteRegister(id);
  res.sendStatus(excluido ? 200 : 404);
}

/**
 * @openapi
 * 
 * /montadores:
 *   get:
 *     summary: "Busca todos os registros"
 * 
 *     tags:
 *       - "montadores"
 * 
 *     operationId: profile_all_montadores
 *     x-eov-operation-handler: montadores/routes
 * 
 *     responses:
 *       '200':
 *         description: "Operação realizada com sucesso"
 *       '404':
 *         description: "Registro não encontrado"
 *       '401':
 *         description: "Usuário não autorizado"
 *
 *     security: 
 *       - JWT: ['ADMIN','USER']
 */
 export async function profile_all_montadores(req, res, _) {

  const montador = await getAll();

  return montador ? res.json(montador) : res.sendStatus(404);
}