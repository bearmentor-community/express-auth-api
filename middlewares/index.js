const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send({
    message: `Example Auth Express by Azobu App`,
    url: `${req.protocol}://${req.get('host')}`,
    documentation: `/docs`,
  })
})

module.exports = router
