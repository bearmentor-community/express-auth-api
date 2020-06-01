const jsonwebtoken = require('jsonwebtoken')

/**
 * Verify token with secret
 */
const verifyToken = async (token) => {
  try {
    // Verify token with the same configured secret
    const decodedToken = await jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET
    )

    return decodedToken
  } catch (error) {
    console.error(`Error when verify token. ${error.name}: ${error.message}`)
    return null
  }
}

module.exports = verifyToken
