import { requestCep } from "./service.mjs";

/**
 * @openapi
 * /cep:
 *   post:
 * 
 *     summary: "Pesquisa cep"
 *     tags:
 *       - "cep"
 * 
 *     operationId: buscacep
 *     x-eov-operation-handler: cep/routes
 *     requestBody:
 *       description: Pesquisa cep
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/cep_request"
 *     responses:
 *       "201":
 *         description: "Operação realizada com sucesso"
 *       "400":
 *         description: "Dados incorretos"
 */

export async function buscacep(req, res, _) {
  const numeroCep = parseInt(req.body.cep);
  res.status(201).json(await requestCep(parseInt(numeroCep)));
}
//------------------------------------------------------------------------//
