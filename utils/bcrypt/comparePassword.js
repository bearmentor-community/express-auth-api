const bcrypt = require('bcrypt')

/**
 * Compare encrypted password with the input plain password
 */
const comparePassword = async (plainPassword, encryptedPassword) => {
  const isPasswordCorrect = await bcrypt.compare(
    plainPassword,
    encryptedPassword
  )

  return isPasswordCorrect
}

module.exports = comparePassword
