const express = require('express')
const router = express.Router()
const public_handle = require('../admin-pc-handle/admin')

// web客户端登录
router.post('/login',public_handle.login)

// 获取数据据
router.post('/getdata',public_handle.getdata)

// 删除数据
router.post('/deledata',public_handle.deledata)

// 查询用户
router.post('/getuser',public_handle.getuser)

// 删除用户
router.post('/deleuser',public_handle.deleuser)

module.exports = router