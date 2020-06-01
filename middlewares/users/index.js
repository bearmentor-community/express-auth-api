const express = require('express')
const router = express.Router()

const users = require('./controllers')
const auth = require('../auth/controllers')

// (POST) Seed initial users
// router.post('/seed', users.seedUsers)

// (GET) Validate user with its token
// router.get('/validate', auth.isAuthenticated, users.validateUser)

// (GET) Get user profile
// router.get('/profile', auth.isAuthenticated, users.getProfile)

// (GET) Search users by name
// router.get('/search', users.searchByName)

// (GET) Get one user by id
// router.get('/:id', users.getOneById)

// (GET) Get all users
// router.get('/', users.getAll)

// (DELETE) Delete all users
// router.delete('/', auth.isAuthenticated, users.deleteAll)

// (DELETE) Delete one user by id
// router.delete('/:id', auth.isAuthenticated, users.deleteOneById)

module.exports = router
