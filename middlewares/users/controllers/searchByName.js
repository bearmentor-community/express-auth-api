const User = require('../model')

/**
 * Search users by name
 */
const searchByName = async (req, res) => {
  const name = req.query.name

  if (name) {
    const users = await User.find(
      { name: { $regex: name, $options: 'i' } },
      '-password -salt'
    )
    if (users) {
      res.status(200).send({
        message: 'Get users by name',
        users: users,
      })
    } else {
      res.status(404).send({
        message: 'User not found by that name',
      })
    }
  } else {
    res.status(400).send({
      message: 'Query name is required',
    })
  }
}

module.exports = searchByName
