import { saveRegister, getRegister, deleteRegister } from "./service.mjs";

//------------------------------------------------------------------------//
/**
 * @openapi
 * /empresas:
 *   post:
 * 
 *     summary: "Cria empresa de montagens"
 *     tags:
 *       - "empresas"
 * 
 *     operationId: create
 *     x-eov-operation-handler: empresas/routes
 *     requestBody:
 *       description: Cria registro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/create_empresas"
 *     responses:
 *       "200":
 *         description: "Operação realizada com sucesso"
 *       "400":
 *         description: "Dados incorretos"
 *       "401":
 *         description: "Usuário não autorizado"
 */

export async function create(req, res, _) {
  res.status(201).json(await saveRegister(req.body));
}
//------------------------------------------------------------------------//

/**
 * @openapi
 * 
 * /empresas/{id}:
 *   get:
 *     summary: "Busca registro pelo ID"
 * 
 *     tags:
 *       - "empresas"
 * 
 *     operationId: profile
 *     x-eov-operation-handler: empresas/routes
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
 *       - JWT: ['USER','ADMIN']
 */
export async function profile(req, res, _) {

  const montador = await getRegister(parseInt(req.params.id));

  return montador ? res.json(montador) : res.sendStatus(404);
}
//------------------------------------------------------------------------//

/**
 * @openapi
 * 
 * /empresas/me:
 *   put:
 *     summary: "Atualiza registro"
 * 
 *     tags:
 *       - "empresas"
 * 
 *     operationId: update
 *     x-eov-operation-handler: empresas/routes
 * 
 *     requestBody:
 *       description: "Atualiza dados do montador"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/update_empresas" 
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
 *       - JWT: ['ADMIN']
 */

export async function update(req, res, _) {
  const montador = { ...req.body };

  const atualizado = await saveRegister(montador);

  if (atualizado) {
    res.json(atualizado);
  } else {
    res.sendStatus(404);
  }
};
//------------------------------------------------------------------------//

/**
 * @openapi
 * 
 * /empresas/{id}:
 *   delete:
 *     summary: "Remove registro pelo ID"
 * 
 *     tags:
 *       - "empresas"
 * 
 *     operationId: remove
 *     x-eov-operation-handler: empresas/routes
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
 *       - JWT: ['ADMIN']
 */
export async function remove(req, res, _) {
  let id = parseInt(req.params.id);

  let excluido = await deleteRegister(id);
  res.sendStatus(excluido ? 200 : 404);
};
//------------------------------------------------------------------------//