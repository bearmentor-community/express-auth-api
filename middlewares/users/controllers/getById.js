const User = require('../model')

/**
 * Get user by id
 */
const getById = async (req, res) => {
  const id = Number(req.params.id)

  const user = await User.findOne({ id: id }, '-password -salt')

  if (user) {
    res.status(200).send({
      message: 'Got one user by id',
      user: user,
    })
  } else {
    res.status(404).send({
      message: 'User is not found by that id',
    })
  }
}

module.exports = getById
