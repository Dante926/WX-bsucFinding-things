const db = require('../mysql/db')

const public_handle={
    public:(req,res)=>{
        // 接收参数
        const { type,classify1,classify2,name,date,region,call,desc,imgList,time} = req.body;
        console.log(req.body);
        // 将数据存储到数据库closeSchema中
        const sqlStr = 'INSERT INTO loseschema (type,classify1,classify2,name,date,region,`call`,`desc`,imgList,time) VALUES (?,?,?,?,?,?,?,?,?,?)'
        db.query(sqlStr,[type,classify1,classify2,name,date,region,call,desc,imgList,time],(err,result)=>{
            if(err){
                return res.send({
                    status:401,
                    message:'发布失败:'+err.message
                })
            }else{
                return res.send({
                    status:200,
                    message:'发布成功..',
                    data:result
                })
            }
        })
    },
}

module.exports = public_handle