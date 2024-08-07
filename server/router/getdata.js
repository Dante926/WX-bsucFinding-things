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
// 获取收藏夹数据
router.post('/getcoldata',public_handle.getcoldata)
// 通过二级分类获取数据
router.post('/getclatwo',public_handle.getclatwo)
// 搜索框模糊查询数据
router.post('/getsearch',public_handle.getsearch)

module.exports = router