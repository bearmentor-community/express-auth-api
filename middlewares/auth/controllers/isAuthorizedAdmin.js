const User = require('../../users/model')

const isAuthorizedAdmin = async (req, res, next) => {
  const decodedAccessToken = req.decodedAccessToken
  const user = await User.findOne({ id: decodedAccessToken.id })

  if (user.isAdmin) {
    next()
  } else {
    res.status(401).send({
      message: 'The user is unauthorized to do that',
      error: 'User is not an admin',
    })
  }
}

module.exports = isAuthorizedAdmin
