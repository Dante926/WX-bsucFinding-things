const express = require('express')
const router = express.Router()
const public_handle = require('../routerhandle/getdata')

router.post('/getdata',public_handle.getdata)

module.exports = router