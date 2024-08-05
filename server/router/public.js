const express = require('express')
const router = express.Router()
const public_handle = require('../routerhandle/public')

router.post('/public',public_handle.public)

module.exports = router