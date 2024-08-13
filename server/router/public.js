const express = require('express')
const router = express.Router()
const public_handle = require('../routerhandle/public')

router.post('/public',public_handle.public)
router.post('/getmypub',public_handle.getmypub)
// 删除我的发布列表里的数据(小程序端)
router.post('/delemypub',public_handle.delemypub)
// 查询物品详情数据 用于修改物品信息
router.post('/getpubdata',public_handle.getpubdata)
// 小程序端修改发布内容
router.post('/updatapub',public_handle.updatapub)

module.exports = router