const express = require('express')
const router = express.Router()
const public_handle = require('../routerhandle/getdata')

router.post('/getdata',public_handle.getdata)

// 处理收藏夹模块数据
// 存储
router.post('/pushcol',public_handle.pushcol)
// 获取是否被收藏纪录
router.post('/getcol',public_handle.getcol)
// 删除收藏
router.post('/delcol',public_handle.delcol)

module.exports = router