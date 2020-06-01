const User = require('../model')
const seedUsersData = require('../seed.json')
const bcrypt = require('../../../utils/bcrypt')

/**
 * Seed users
 */
const seed = async (req, res) => {
  const foundUser = await User.findOne({ email: seedUsersData[0].email })

  // Don't continue if there is already a user
  if (!foundUser) {
    await seedUsersData.forEach(async (user) => {
      const { salt, encryptedPassword } = await bcrypt.encryptPassword(
        user.password
      )

      await User.create({
        name: user.name,
        email: user.email,
        salt: salt,
        password: encryptedPassword,
      })
    })

    res.status(200).send({
      message: 'Seed initial users completed',
    })
  } else {
    res.status(500).send({
      message:
        'Failed to seed initial users because they are already registered',
    })
  }
}

module.exports = seed
