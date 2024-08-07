const express = require('express')
const router = express.Router()
const public_handle = require('../routerhandle/public')

router.post('/public',public_handle.public)
router.post('/getmypub',public_handle.getmypub)

module.exports = router