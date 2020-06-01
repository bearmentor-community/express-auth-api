const bcrypt = require('bcrypt')

/**
 * Encrypt password, return salt and encrypted password
 */
const encryptPassword = async (plainPassword) => {
  // Generate salt
  const salt = await bcrypt.genSalt(10)

  // Encrypt/hash the plain password with generated salt
  // With becrypt, we have to use the salt
  const encryptedPassword = await bcrypt.hash(plainPassword, salt)

  // Return both salt & encryptedPassword as an object
  // Will be used in the register middleware
  // Both salt and encryptedPassword will be stored in the database
  // But we will NOT store the plainPassword in the database
  return {
    salt,
    encryptedPassword,
  }
}

module.exports = encryptPassword
