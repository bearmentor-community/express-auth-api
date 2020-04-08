const express = require('express')
const router = express.Router()

const users = require('./controllers')
const auth = require('../auth/controllers')

// (POST) Register new user
router.post('/register', auth.isUserExist, users.register)

// (POST) Login to user
router.post('/login', users.login)

// (GET) Validate user with its token
router.get('/validate', auth.isAuthenticated, users.validateUser)

// (GET) Get user profile
router.get('/profile', auth.isAuthenticated, users.getProfile)

// (GET) Search users by name
router.get('/search', auth.isAuthenticated, users.searchByName)

// (GET) Get one user by id
router.get('/:id', auth.isAuthenticated, users.getOneById)

// (GET) Get all users
router.get('/', auth.isAuthenticated, users.getAll)

// (DELETE) Delete all users
router.delete('/', auth.isAuthenticated, users.deleteAll)

// (DELETE) Delete one user by id
router.delete('/:id', auth.isAuthenticated, users.deleteOneById)

module.exports = router
