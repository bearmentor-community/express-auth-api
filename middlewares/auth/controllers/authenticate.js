const jsonwebtoken = require('../../../utils/jsonwebtoken')

const authenticate = async (req, res) => {
  // Only continue if user is registered and the password is correct
  if (req.isRegistered && req.isPasswordCorrect) {
    // Create an access token
    const accessToken = await jsonwebtoken.createToken(req.user)

    if (accessToken) {
      res.status(200).send({
        message: 'User is successfully authenticated',
        accessToken: accessToken,
      })
    } else {
      res.status(500).send({
        message: 'Authentication failed because token creation is failed',
      })
    }
  } else if (!res.isPasswordCorrect) {
    res.status(400).send({
      message: 'Authentication failed because password is incorrect',
      password: req.body.password,
    })
  } else {
    res.status(400).send({
      message: 'Authentication failed because of unknown reason',
    })
  }
}

module.exports = authenticate
