const db = require('../mysql/db')

const public_handle = {

    login: (req, res) => {
        const {username,password} = req.body;
        const sqlStr = 'select * from SuperUsers where username = ?'
        db.query(sqlStr,username,(err,result)=>{
            if(err) return res.send({status:500,message:'登录失败',data:err})
            if(result.length === 0) return res.send({status:500,message:'用户名错误'})
            if(result[0].password === password) return res.send({status:200,message:'登录成功',data:result[0]})
            else return res.send({status:500,message:'密码错误'})
        })
    }
}

module.exports = public_handle