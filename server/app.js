const express = require('express');
const app = express();

// 跨域中间件
const cors = require('cors');
app.use(cors());

// 解析中间件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));// 只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(bodyParser.json());

// 图片存储
const multer = require('multer');
const { v4 } = require('uuid');
app.use(express.static('./public/img'))
const upload = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/')
    },
    filename: function (req, file, cb) {
        const type = file.originalname.replace(/.+\./, '');
        console.log(type);
        cb(null, v4() + '.' + type)

    }
})
const uploads = multer({ storage: upload })
app.post('/uploadImg', uploads.array('file', 6), (req, res) => {
    res.send({
        status: 200,
        message: '上传成功',
        data: req.files
    })
})

// 发布模块路由
const publicRouter = require('./router/public')
app.use('/pubapi', publicRouter)

// 获取数据模块
const getDataRouter = require('./router/getdata')
app.use('/getapi', getDataRouter)

// 用户登录获取openid接口
const axios = require('axios')
app.get('/login', async (req, res) => {
    try {
        const { code } = req.query;

        // 使用 await 发起异步请求
        const response = await axios.get(`https://api.weixin.qq.com/sns/jscode2session`, {
            params: {
                appid: 'wx195b9f2e9bf474a7',
                secret: 'f8d786a9218a2dd2eb778b4e063ef756',
                js_code: code,
                grant_type: 'authorization_code'
            }
        });

        // 发送成功响应到客户端
        res.send({
            status: '200',
            message: 'Success',
            data: response.data
        });
    } catch (error) {
        // 处理错误的情况
        console.error('Error fetching data from WeChat API:', error);

        // 发送失败响应到客户端
        res.status(500).send({
            status: '500',
            message: 'Failed to fetch data from WeChat API'
        });
    }
});

// 用户学号注册模块
const loginRouter = require('./router/login')
app.use('/loginapi', loginRouter)

app.listen(8082, () => {
    console.log('Server is running http://127.0.0.1:8082')
})