const express = require('express')
const router = express.Router()

const {
  registerSeed,
  register,
  login,
  getAll,
  getById,
  searchByName,
  removeAll,
} = require('./controllers')

router.post('/register/seed', registerSeed)
router.post('/register', register)
router.post('/login', login)
router.get('/search', searchByName)
router.get('/', getAll)
router.get('/:id', getById)
router.delete('/', removeAll)

module.exports = router
