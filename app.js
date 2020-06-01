require('dotenv').config()

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const YAML = require('yamljs')

const indexMiddleware = require('./middlewares')
const authMiddleware = require('./middlewares/auth')
const usersMiddleware = require('./middlewares/users')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexMiddleware)
app.use('/auth', authMiddleware)
app.use('/users', usersMiddleware)

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).send({
    error: err,
  })
})

module.exports = app
