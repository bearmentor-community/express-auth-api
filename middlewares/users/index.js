const express = require('express')
const router = express.Router()

const users = require('./controllers')
const auth = require('../auth/controllers')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

////////////////////////////////////////////////////////////////////////////////
// (POST) Register new user
/**
 * @swagger
 * path:
 *  /users/register:
 *    post:
 *      summary: Register a new user
 *      description:
 *      operationId: registerUser
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *             application/json:
 *               schema:
 *                type: object
 *                properties:
 *                  newUser:
 *                    type: object
 *                    description: New user input
 *                    properties:
 *                      name:
 *                        type: string
 *                        example: M Haidar Hanif
 *                        description: User's name
 *                      email:
 *                        type: string
 *                        example: haidar@haidar.com
 *                        description: User's email
 *                  result:
 *                    type: object
 *                    description: Newly created user
 *                    properties:
 *                      __v:
 *                        type: integer
 *                        example: 0
 *                      _id:
 *                        type: string
 *                        example: 5e8dca8d46afac0017c7786c
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      name:
 *                        type: string
 *                        example: M Haidar Hanif
 *                      email:
 *                        type: string
 *                        example: haidar@haidar.com
 *                      salt:
 *                        type: string
 *                        example: HIDDEN_SALT
 *                      password:
 *                        type: string
 *                        example: HIDDEN_PASSWORD
 *                      createdAt:
 *                        type: date
 *                        example: 2020-04-08T14:41:04.685Z
 *                      updatedAt:
 *                        type: date
 *                        example: 2020-04-08T14:41:04.685Z
 *        "400":
 *          description: Failed to register a new account because email exist
 *          content:
 *             application/json:
 *               schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Your email is already registered
 *                  error:
 *                    type: string
 *                    example: User is already exist with that email
 */
router.post('/register', auth.isUserExist, users.register)

////////////////////////////////////////////////////////////////////////////////
// (POST) Login to user
router.post('/login', users.login)

////////////////////////////////////////////////////////////////////////////////
// (POST) Seed initial users
router.post('/seed', users.seedUsers)

////////////////////////////////////////////////////////////////////////////////
// (GET) Validate user with its token
router.get('/validate', auth.isAuthenticated, users.validateUser)

////////////////////////////////////////////////////////////////////////////////
// (GET) Get user profile
router.get('/profile', auth.isAuthenticated, users.getProfile)

////////////////////////////////////////////////////////////////////////////////
// (GET) Search users by name
router.get('/search', auth.isAuthenticated, users.searchByName)

////////////////////////////////////////////////////////////////////////////////
// (GET) Get one user by id
router.get('/:id', auth.isAuthenticated, users.getOneById)

////////////////////////////////////////////////////////////////////////////////
// (GET) Get all users
/**
 * @swagger
 * path:
 *  /users/:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: An array of users
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.get('/', auth.isAuthenticated, users.getAll)

////////////////////////////////////////////////////////////////////////////////
// (DELETE) Delete all users
router.delete('/', auth.isAuthenticated, users.deleteAll)

////////////////////////////////////////////////////////////////////////////////
// (DELETE) Delete one user by id
/**
 * @swagger
 * path:
 *  /users/{id}:
 *    delete:
 *      summary: Delete one user by id
 *      description:
 *      operationId: deleteOneUserById
 *      tags: [Users]
 *      parameters:
 *        - name: "Authorization"
 *          in: "header"
 *          required: true
 *          type: "string"
 *        - name: "id"
 *          in: "path"
 *          description: "User id to delete"
 *          required: true
 *          type: "integer"
 *          format: "int64"
 *      responses:
 *        "200":
 *          description: Succesfully delete one user by id
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Message
 *                  id:
 *                    type: integer
 *                    description: User id
 *                  user:
 *                    type: object
 *                    description: User object data
 *        "404":
 *           description: Failed to delete one user by id
 *           content:
 *             application/json:
 *               schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Message
 *                  id:
 *                    type: integer
 *                    description: User id
 */
router.delete('/:id', auth.isAuthenticated, users.deleteOneById)

module.exports = router
