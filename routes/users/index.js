const express = require('express')
const router = express.Router()

const {
  registerSeed,
  register,
  login,
  getAll,
  getById,
  removeAll,
} = require('./controllers')

router.post('/register/seed', registerSeed)
router.post('/register', register)
router.post('/login', login)
router.get('/', getAll)
router.get('/:id', getById)
router.delete('/', removeAll)

module.exports = router
