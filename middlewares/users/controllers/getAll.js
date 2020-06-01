const User = require('../model')

// Get all users
const getAll = async (req, res) => {
  const users = await User.find({}, '-password -salt')

  res.status(200).send({
    message: 'Get all users',
    users: users,
  })
}

module.exports = getAll
