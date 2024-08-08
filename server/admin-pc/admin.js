const express = require('express')
const router = express.Router()
const public_handle = require('../admin-pc-handle/admin')

router.post('/login',public_handle.login)

module.exports = router