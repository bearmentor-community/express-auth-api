const User = require('./model')

const bcrypt = require('../../utils/bcrypt')
const jwt = require('../../utils/jwt')

const seedUsersData = require('./seed.json')

const usersControllers = {
  //////////////////////////////////////////////////////////////////////////////
  // REGISTER NEW USER
  register: async (req, res) => {
    // using encryptPassword is a slow process, so we use await
    // then destructure salt & password from encryptPassword() returned value
    const { salt, encryptedPassword } = await bcrypt.encryptPassword(
      req.body.password
    )

    // creating an object is a fast process
    const newUser = {
      name: req.body.name, // from body
      email: req.body.email, // from body
      salt: salt, // NOT from body, from helpers
      password: encryptedPassword, // NOT from body, from helpers
    }
    // creating a user in the database is a slow process
    const result = await User.create(newUser)

    // responding is a fast process
    res.status(201).send({
      message: 'User is successfully registered',
      newUser: {
        name: newUser.name,
        email: newUser.email,
      },
      result: {
        ...result._doc,
        salt: 'HIDDEN_SALT',
        password: 'HIDDEN_PASSWORD',
      },
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // LOGIN WITH REGISTERED USER
  login: async (req, res) => {
    // get email & password from body
    const user = {
      email: req.body.email,
      password: req.body.password,
    }

    // search for matched user's email
    const foundUser = await User.findOne(
      { email: user.email } // search for email
    )

    // only continue if user is found
    if (foundUser) {
      // slow process to determine password is matched
      // authenticated result is either true or false
      const authenticated = await bcrypt.comparePassword(
        user.password,
        foundUser.password
      )

      if (authenticated) {
        // create token with JWT
        const token = await jwt.createToken(foundUser)

        res.status(200).send({
          message: 'Login successful',
          token: token,
          user: {
            name: foundUser.name,
            email: foundUser.email,
          },
        })
      } else {
        res.status(401).send({
          message: 'Login failed because password is wrong',
        })
      }
    } else {
      res.status(401).send({
        message: 'Login failed because user with that email is not found',
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // LOGOUT WITH LOGGED IN USER
  logout: async (req, res) => {
    res.status(200).send({
      message: 'Logged out the user',
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // GET PROFILE BY AUTHENTICATED/AUTHORIZED USER
  getProfile: async (req, res) => {
    // You have to put the token in Authorization: Bearer {token}

    // token is retrieved in previous middleware via auth.isAuthenticated
    // check in middlewares/users/index.js when router.get('/profile')
    const token = req.token
    // get the decodedUser object as well
    const decodedUser = req.decoded

    // check if the decodedUser.sub, the user _id, is exist
    // decodedUser.sub = '5c6fd1eb739522a11e19923e'
    if (decodedUser.sub) {
      const user = await User.findById(decodedUser.sub, '-password -salt')

      res.status(200).send({
        message: 'Get my profile',
        tokenIsExist: true,
        decodedUser: decodedUser,
        userIsFound: Boolean(user),
        user: user,
      })
    } else {
      res.status(400).send({
        message: 'User is not authorized',
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // GET ALL USERS
  getAll: async (req, res) => {
    const users = await User.find({}, '-password -salt')

    res.status(200).send({
      message: 'Get all users',
      users: users,
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // GET ONE USER BY ID
  getOneById: async (req, res) => {
    const user = await User.findOne({ id: req.params.id }, '-password -salt')

    if (user) {
      res.status(200).send({
        message: 'Get one user by id',
        user: user,
      })
    } else {
      res.status(404).send({
        message: 'User not found by that id',
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // DELETE ALL USERS
  deleteAll: async (req, res) => {
    const result = await User.remove({})
    res.status(200).send({
      message: 'Delete all users',
      result: result,
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // DELETE ONE USER BY ID
  deleteOneById: async (req, res) => {
    const userFound = await User.findOne({ id: Number(req.params.id) })

    // the user has to be found first
    if (userFound) {
      const user = await User.findOneAndRemove(
        { id: Number(req.params.id) },
        { select: '-password -salt' }
      )

      res.status(200).send({
        message: 'Deleted one user by id',
        id: Number(req.params.id),
        user: user,
      })
    } else {
      res.status(404).send({
        message: 'User is not found by that id',
        id: Number(req.params.id),
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // SEARCH USERS BY NAME
  searchByName: async (req, res, next) => {
    const name = req.query.name

    if (name) {
      const users = await User.find(
        { name: { $regex: name, $options: 'i' } },
        '-password -salt'
      )
      if (users) {
        res.status(200).send({
          message: 'Get users by name',
          users: users,
        })
      } else {
        res.status(404).send({
          message: 'User not found by that name',
        })
      }
    } else {
      res.status(400).send({
        message: 'Query name is required',
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // VERIFY USER TOKEN
  validateUser: async (req, res) => {
    const token = req.token
    const decodedUser = req.decoded

    if (decodedUser.sub) {
      const user = await User.findById(decodedUser.sub, '-password -salt')
      res.status(200).send({
        message: 'User is valid with verified token',
        tokenIsExist: true,
        decodedUser: decodedUser,
        userIsFound: Boolean(user),
      })
    } else {
      res.status(400).send({
        message: 'User is invalid without verified token',
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // SEED USERS
  seedUsers: async (req, res) => {
    const foundUser = await User.findOne({ email: seedUsersData[0].email })

    if (!foundUser) {
      await seedUsersData.forEach(async (user) => {
        if (!foundUser) {
          const { salt, encryptedPassword } = await bcrypt.encryptPassword(
            user.password
          )
          const newUser = {
            name: user.name,
            email: user.email,
            salt: salt,
            password: encryptedPassword,
          }
          await User.create(newUser)
        }
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
  },
}

module.exports = usersControllers
