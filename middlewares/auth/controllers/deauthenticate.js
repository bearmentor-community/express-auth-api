const deauthenticate = async (req, res) => {
  if (req.decodedAccessToken) {
    res.status(200).send({
      message: 'User is successfully deauthenticated',
      email: req.decodedAccessToken.email,
    })
  } else {
    res.status(500).send({
      message: 'User is failed to deauthenticate',
      email: req.decodedAccessToken.email,
    })
  }
}

module.exports = deauthenticate
