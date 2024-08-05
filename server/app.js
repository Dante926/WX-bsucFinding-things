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
const {v4} = require('uuid');
app.use(express.static('./public/img'))
const upload = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/')
    },
    filename: function (req, file, cb) {
        const type = file.originalname.replace(/.+\./,'');
        console.log(type);
        cb(null, v4()+'.'+type)
        
    }
})
const uploads = multer({ storage: upload })
app.post('/uploadImg',uploads.array('file',6),(req,res)=>{
    res.send({
        status:200,
        message:'上传成功',
        data:req.files
    })
})

//发布模块路由
const publicRouter = require('./router/public')
app.use('/pubapi',publicRouter)
// app.get('/hello', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(8082, () => {
    console.log('Server is running http://127.0.0.1:8082')
})