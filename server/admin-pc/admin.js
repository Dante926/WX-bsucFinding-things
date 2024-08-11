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

// 查询管理员用户
router.post('/getadmin',public_handle.getadmin)

// 删除管理员用户
router.post('/deleadmin',public_handle.deleadmin)

// 新增管理员
router.post('/addadmin',public_handle.addadmin)

module.exports = router