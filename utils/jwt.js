const jwt = require('jsonwebtoken')

module.exports = {
  //////////////////////////////////////////////////////////////////////////////
  // CREATE A NEW TOKEN WITH PAYLOAD sub: _id
  createToken: async (foundUser) => {
    // create the payload WITHOUT having the salt & password
    const payload = {
      sub: foundUser._id, // sub: subject: user's id
      name: foundUser.name, // name: user's full name
      email: foundUser.email, // email: user's email
      // iat: issued at: will be created automatically as UNIX timestamp
    }

    // create the token using jwt.sign()
    // will be expired in 1 day
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    // return token to be used later by the frontend
    return token
  },

  //////////////////////////////////////////////////////////////////////////////
  // VERIFY TOKEN
  verifyToken: async (token) => {
    // use try catch to prevent app crashing
    try {
      // verify token with the same secret from backend
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
      // decoded token example:
      // { sub: '5c6fd1eb739522a11e19923e', iat: 1550834260 }

      // return decoded token object is fine
      return decodedToken
    } catch (error) {
      // catch the error if it's happen
      // such as when the token is invalid or decodedToken is false
      return error
    }
  },
}
