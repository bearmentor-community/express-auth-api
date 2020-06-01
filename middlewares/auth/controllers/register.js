const User = require('../../users/model')
const bcrypt = require('../../../utils/bcrypt')

const register = async (req, res) => {
  if (req.isRegistered) {
    res.status(409).send({
      message: 'The user is already registered with that email',
      email: req.body.email,
    })
  } else {
    // Destructure user's data from request body
    const { name, email, password } = req.body

    // Encrypt password with plain text from request body
    // Destructure returned value to get salt and password
    const { salt, encryptedPassword } = await bcrypt.encryptPassword(password)

    // Create a new user object
    const user = {
      name: name,
      email: email,
      salt: salt,
      password: encryptedPassword,
    }

    // Create an actual user in the database
    await User.create(user)

    // Only send the name and email, without salt and password
    res.status(201).send({
      message: 'User is successfully registered',
      user: {
        name: user.name,
        email: user.email,
      },
    })
  }
}

module.exports = register
