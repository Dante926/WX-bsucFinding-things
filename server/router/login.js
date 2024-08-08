const express = require('express')
const router = express.Router()
const public_handle = require('../routerhandle/login')

router.post('/register',public_handle.register)
router.post('/login',public_handle.login)

module.exports = router