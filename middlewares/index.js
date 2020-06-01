const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send({
    message: `Example Auth Express`,
    author: `Azobu App`,
    url: `${req.protocol}://${req.get('host')}`,
  })
})

module.exports = router
