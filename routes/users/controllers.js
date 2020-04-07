const usersSeed = require('./seed.json')

module.exports = {
  registerSeed: (req, res, next) => {
    res.send({
      message: `Registered seed users`,
      data: usersSeed,
    })
  },

  register: (req, res, next) => {
    res.send({
      message: `Registered new user`,
      data: {},
    })
  },

  login: (req, res, next) => {
    res.send({
      message: `Logged in to existing user`,
      data: {},
    })
  },

  getAll: (req, res, next) => {
    res.send({
      message: `Get all users`,
      data: usersSeed,
    })
  },

  getById: (req, res, next) => {
    res.send({
      message: `Get user by id`,
      data: {},
    })
  },

  searchByName: (req, res, next) => {
    const name = req.query.name

    if (name) {
      const data = usersSeed.filter((user) => {
        return user.name.toLowerCase().includes(name.toLowerCase())
      })

      res.send({
        message: `Searched user by name`,
        name: name,
        data: data,
      })
    } else {
      res.send({
        message: `User is not found`,
        name: name,
      })
    }
  },

  removeAll: (req, res, next) => {
    res.send({
      message: `Removed all users`,
    })
  },
}
