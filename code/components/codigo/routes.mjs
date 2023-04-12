import { codeEmail } from "./service.mjs";

/**
 * @openapi
 * /codigo:
 *   post:
 * 
 *     summary: "Envia código randomizado de 6 dígitos no email"
 *     tags:
 *       - "code"
 * 
 *     operationId: codemail
 *     x-eov-operation-handler: codigo/routes
 *     requestBody:
 *       description: Envia código randomizado de 6 dígitos no email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/codeEmail"
 *     responses:
 *       "201":
 *         description: "Operação realizada com sucesso"
 *       "400":
 *         description: "Dados incorretos"
 */

export async function codemail(req, res, _) {
  res.status(201).json(await codeEmail(req.body));
}
//------------------------------------------------------------------------//
