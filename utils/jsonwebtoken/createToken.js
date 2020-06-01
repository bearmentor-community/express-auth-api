const jsonwebtoken = require('jsonwebtoken')

/**
 * Create a new token with payload sub: _id
 */
const createToken = async (user) => {
  // Create the payload without having the salt and password
  const payload = {
    _id: user._id,
    id: user.id,
    name: user.name,
    email: user.email,
  }

  // Create the token and sign with secret
  // It will be expired in 1 day and has iat (issued at) as UNIX timestamp
  try {
    const jwt = await jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    return jwt
  } catch (error) {
    return error
  }
}

module.exports = createToken
