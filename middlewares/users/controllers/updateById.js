const User = require('../model')

/**
 * Update user by id
 */
const updateById = async (req, res) => {
  const id = Number(req.params.id)
  const user = await User.findOne({ id: id })

  // Continue if the user is found and the token is match with the user's id
  if (user && req.decodedAccessToken.id === user.id) {
    const result = await User.findOneAndUpdate(
      {
        id: user.id,
      },
      {
        name: req.body.name,
      },
      {
        new: true,
        select: '-password -salt',
      }
    )

    res.status(200).send({
      message: 'Updated user by id',
      id: id,
      updatedUser: {
        name: result.name,
        email: result.email,
      },
    })
  } else if (!user) {
    res.status(404).send({
      message: 'User is not found by that id',
      id: id,
    })
  }
}

module.exports = updateById
