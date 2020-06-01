const auth = {
  register: require('./register'),
  authenticate: require('./authenticate'),
  deauthenticate: require('./deauthenticate'),
  isRegistered: require('./isRegistered'),
  isPasswordCorrect: require('./isPasswordCorrect'),
  isAuthenticated: require('./isAuthenticated'),
}

module.exports = auth
