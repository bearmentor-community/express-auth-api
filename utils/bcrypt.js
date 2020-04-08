const bcrypt = require('bcrypt')

module.exports = {
  //////////////////////////////////////////////////////////////////////////////
  // ENCRYPT PASSWORD, RETURN SALT & ENCRYPTED PASSWORD
  encryptPassword: async (plainPassword) => {
    // generate salt
    const salt = await bcrypt.genSalt(10)
    // encrypt/hash the plain password with generated salt
    // with becrypt, we have to use the salt
    const encryptedPassword = await bcrypt.hash(plainPassword, salt)

    // return both salt & encryptedPassword as an object
    // will be used in the register middleware
    // both salt & encryptedPassword will be stored in the database
    // but we will NOT store the plainPassword in the database
    return {
      salt,
      encryptedPassword,
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // COMPARE ENCRYPTED PASSWORD WITH PLAIN PASSWORD
  comparePassword: async (password, encryptedPassword) => {
    // slow process to determine password is matched
    const isAuthenticated = await bcrypt.compare(password, encryptedPassword)

    // result is either true or false
    return isAuthenticated
  },
}
