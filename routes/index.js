const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send({
    message: `Project Auth Express`,
  })
})

module.exports = router
