const express = require('express')
const router = express.Router()

const auth = require('../auth/controllers')
const users = require('./controllers')

router.post('/seed', users.seed)
// router.get('/profile', auth.isAuthenticated, users.getProfile)
// router.get('/search', users.searchByName)
router.get('/', users.getAll)
router.get('/:id', users.getById)
router.put('/:id', auth.isAuthenticated, auth.isAuthorized, users.updateById)
router.delete(
  '/',
  auth.isAuthenticated,
  auth.isAuthorizedAdmin,
  users.deleteAll
)
router.delete('/:id', auth.isAuthenticated, users.deleteById)

module.exports = router
