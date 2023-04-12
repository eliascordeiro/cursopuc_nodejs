import { saveRegister, deleteRegister, getRegister, getAll, getProduto } from "./service.mjs";

/**
 * @openapi
 * /montagens:
 *   post:
 *     summary: "Cria registro"
 *     tags:
 *       - "montagens"
 * 
 *     operationId: create
 *     x-eov-operation-handler: montagens/routes
 *     requestBody:
 *       description: Cria registro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/create_montagens"
 *     responses:
 *       "201":
 *         description: "Operação realizada com sucesso"
 *       "400":
 *         description: "Dados incorretos"
 *       "401":
 *         description: "Usuário não autorizado"
 *     security: 
 *       - JWT: ['ADMIN','USER']
 */

export async function create(req, res, _) {
  const typesId = req.user.typesId;
  const token = req.user;

  const values = { ...req.body, typesId, token };
  res.status(201).json(await saveRegister(values));
}
//------------------------------------------------------------------------//

/**
 * @openapi
 * 
 * /montagens/{id}:
 *   get:
 *     summary: "Busca registro pelo ID"
 * 
 *     tags:
 *       - "montagens"
 * 
 *     operationId: profile
 *     x-eov-operation-handler: montagens/routes
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

  const montagemId = await getRegister(parseInt(req.params.id));

  return montagemId ? res.json(montagemId) : res.sendStatus(404);
}
//------------------------------------------------------------------------//

/**
 * @openapi
 * 
 * /montagens/me:
 *   put:
 *     summary: "Atualiza registro"
 * 
 *     tags:
 *       - "montagens"
 * 
 *     operationId: update
 *     x-eov-operation-handler: montagens/routes
 * 
 *     requestBody:
 *       description: "Atualiza dados da montagem"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/update_montagens" 
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

  console.log(req.body);

  const typesId = req.user.typesId; 
  const montagens = { ...req.body, typesId };

  const updated = await saveRegister(montagens);

  if (updated) {
    res.json(updated);
  } else {
    res.sendStatus(404);
  }
};
//------------------------------------------------------------------------//

/**
 * @openapi
 * 
 * /montagens/{id}:
 *   delete:
 *     summary: "Remove registro pelo ID"
 * 
 *     tags:
 *       - "montagens"
 * 
 *     operationId: remove
 *     x-eov-operation-handler: montagens/routes
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

  let deleted = await deleteRegister(id);
  res.sendStatus(deleted ? 200 : 404);
};
//------------------------------------------------------------------------//


/**
 * @openapi
 * 
 * /montagens:
 *   get:
 *     summary: "Busca todos os registros"
 * 
 *     tags:
 *       - "montagens"
 * 
 *     operationId: todasMontagens
 *     x-eov-operation-handler: montagens/routes
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
export async function todasMontagens(req, res, _) {

  const montagens = await getAll();
  return montagens ? res.json(montagens) : res.sendStatus(404);
}

//------------------------------------------------------------------------//

/**
 * @openapi
 * 
 * /montagens/produtos/{id}:
 *   get:
 *     summary: "Busca registro pelo ID"
 * 
 *     tags:
 *       - "montagens"
 * 
 *     operationId: montagensProdutos
 *     x-eov-operation-handler: montagens/routes
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
 export async function montagensProdutos(req, res, _) {

  const produto = await getProduto(parseInt(req.params.id));

  return produto ? res.json(produto) : res.sendStatus(404);
}
//------------------------------------------------------------------------//
