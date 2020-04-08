const jwt = require('../../utils/jwt')

const User = require('../users/model')

const authControllers = {
  //////////////////////////////////////////////////////////////////////////////
  // GET TOKEN
  isAuthenticated: async (req, res, next) => {
    try {
      // Get the token in headers of Authorization
      // Authorization: Bearer {this_is_the_token}
      const token = req.headers.authorization.split(' ')[1]
      const decoded = await jwt.verifyToken(token)

      // the token will be saved somewhere soon
      // in testing, you can save it in Postman configuration
      // in frontend app, you can save it in Redux store/state

      // we put the token and decoded in request object
      // so it can be accessed by other middlewares
      req.token = token
      req.decoded = decoded

      // go to next middleware
      next()
    } catch (error) {
      // If failed to get the token
      res.status(401).send({
        message: 'You are not authenticated nor authorized',
        error: 'Token is invalid or not exist in headers of Authorization',
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // CHECK IF USER ALREADY EXIST
  isUserExist: async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    // if user does not exist, you can continue
    if (!user) {
      next()
    } else {
      res.status(409).send({
        message: 'You are already registered',
        error: 'User is already exist with that email',
      })
    }
  },
}

module.exports = authControllers
