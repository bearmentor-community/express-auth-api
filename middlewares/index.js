const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send({
    message: `Project Auth Express`,
    documentation: `https://api.haidar.dev/docs`,
  })
})

module.exports = router
