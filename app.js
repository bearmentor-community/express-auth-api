require('dotenv').config()

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const indexMiddleware = require('./middlewares/index')
const usersMiddleware = require('./middlewares/users/index')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexMiddleware)
app.use('/users', usersMiddleware)

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).send({
    error: err,
  })
})

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Auth Express API',
      version: '1.0.0',
      description: 'Example API project using Express',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Swagger',
        url: 'https://swagger.io',
        email: 'Info@SmartBear.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/',
      },
    ],
  },
  apis: ['./middlewares/users/model.js', './middlewares/users/index.js'],
}

const specs = swaggerJsdoc(options)

app.use('/docs', swaggerUi.serve)
app.get('/docs', swaggerUi.setup(specs, { explorer: true }))

module.exports = app
