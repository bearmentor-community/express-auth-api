const User = require('../../users/model')

const isAuthorized = async (req, res, next) => {
  const id = Number(req.params.id)
  const user = await User.findOne({ id: req.decodedAccessToken.id })

  if (id === user.id) {
    next()
  } else {
    res.status(401).send({
      message: 'The user is unauthorized to do that',
      error: 'The id in the token is not match with the expected user',
    })
  }
}

module.exports = isAuthorized
