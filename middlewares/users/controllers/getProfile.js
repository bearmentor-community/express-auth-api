const User = require('../model')

// Get profile by authenticated user
const getProfile = async (req, res) => {
  const decodedAccessToken = req.decodedAccessToken

  // Check if the the user's id is exist in the decoded access token
  if (decodedAccessToken.id) {
    const user = await User.findOne(
      { id: decodedAccessToken._id },
      '-password -salt'
    )

    res.status(200).send({
      message: 'User profile is successfully retrieved',
      user: user,
    })
  } else {
    res.status(400).send({
      message: 'User is not authenticated',
    })
  }
}

module.exports = getProfile
