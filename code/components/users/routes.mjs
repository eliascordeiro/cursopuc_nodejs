import { getUser, login, loginPassword, saveUserUpdate, saveUserInsert } from "./service.mjs";
import { removeUser } from "./repository.mjs";

/**
 * @openapi
 * /users:
 *   post:
 *     summary: "Create user"
 * 
 *     tags:
 *       - "users"
 *     
 *     operationId: create_user
 *     x-eov-operation-handler: users/routes
 * 
 *     requestBody:
 *       description: Create user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateUser" 
 * 
 *     responses:
 *       '201':
 *         description: "User created"
 *       '400':
 *         description: "Invalid data provided"
 *       '401':
 *         description: "Create failed"
 */
export async function create_user(req, res, _) {
  res.status(201).json(await saveUserInsert(req.body));
}

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: "Logs in the user"
 * 
 *     tags:
 *       - "users"
 *     
 *     operationId: user_login
 *     x-eov-operation-handler: users/routes
 * 
 *     requestBody:
 *       description: Login information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UsernamePassword" 
 * 
 *     responses:
 *       '200':
 *         description: "User logged in"
 *       '400':
 *         description: "Invalid data provided"
 *       '401':
 *         description: "Login failed"
 */
export async function user_login(req, res, _) {
  console.log(req.body);
  const user = await login(req.body);
  return user ? res.json(user) : res.sendStatus(401);
}

/**
 * @openapi
 * 
 * /users/me:
 *   get:
 *     summary: "Retrieves user information"
 * 
 *     tags:
 *       - "users"
 * 
 *     operationId: get_user
 *     x-eov-operation-handler: users/routes
 * 
 *     responses:
 *       '200':
 *         description: "Returns the user"
 *       '404':
 *         description: "User not found"
 *
 *     security: 
 *       - JWT: ['ADMIN','USER']
 */
 export async function get_user(req, res, _) {  

  const user = await getUser(parseInt(req.user.id));

  return user ? res.json(user) : res.sendStatus(404);
}

/**
 * @openapi
 * 
 * /users/me:
 *   put:
 *     summary: "Update user"
 * 
 *     tags:
 *       - "users"
 * 
 *     operationId: update_user
 *     x-eov-operation-handler: users/routes
 * 
 *     requestBody:
 *       description: Update user
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateUser" 
 * 
 *     responses:
 *       '200':
 *         description: "Updated user"
 *       '404':
 *         description: "User not found"
 */

export async function update_user(req, res, _) {
  const updated = await saveUserUpdate(req.body);

  if (updated) {
    res.json(updated);
  } else {
    res.sendStatus(404);
  }
};

/**
 * @openapi
 * 
 * /users/me:
 *   delete:
 *     summary: "Delete user"
 * 
 *     tags:
 *       - "users"
 * 
 *     operationId: delete_user
 *     x-eov-operation-handler: users/routes
 * 
 *     responses:
 *       '200':
 *         description: "Deleted user"
 *       '404':
 *         description: "User not found"
 *
 *     security: 
 *       - {}
 *       - JWT: ['USER']
 */
export async function delete_user(req, res, _) {
  let id = parseInt(req.user.id);

  let deleted = await removeUser(id);
  res.sendStatus(deleted ? 200 : 404);
};

/**
 * @openapi
 * /users/auth:
 *   post:
 *     summary: "Autenticação somente pela senha"
 * 
 *     tags:
 *       - "users"
 *     
 *     operationId: auth_password
 *     x-eov-operation-handler: users/routes
 * 
 *     requestBody:
 *       description: Auth information with password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AuthPassword" 
 * 
 *     responses:
 *       '200':
 *         description: "User logged in"
 *       '400':
 *         description: "Invalid data provided"
 *       '401':
 *         description: "Login failed"
 * 
 *     security: 
 *       - {}
 *       - JWT: ['ADMIN','USER'] 
 */

 export async function auth_password(req, res, _) {
  
  let id = parseInt(req.user.id);

  const user = { id, ...req.body };

  const data = await loginPassword(user);

  return user ? res.json(data) : res.sendStatus(404);

};