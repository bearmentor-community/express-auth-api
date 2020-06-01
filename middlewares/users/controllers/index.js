const User = require('../model')
const bcrypt = require('../../../utils/bcrypt')
const jwt = require('../../../utils/jsonwebtoken')

module.exports = {
  seed: require('./seed'),
  getAll: require('./getAll'),
  getById: require('./getById'),
  updateById: require('./updateById'),
  deleteAll: require('./deleteAll'),
  deleteById: require('./deleteById'),
  getProfile: require('./getProfile'),
  searchByName: require('./searchByName'),
}
