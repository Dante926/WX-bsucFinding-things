const db = require('../mysql/db')

const public_handle={
    getdata:(req,res)=>{
        const type = req.body.type
        if(type == 0){
            const sqlStr = `select * from loseSchema where type = 0`
            db.query(sqlStr,(err,result)=>{
                if(err) return res.send({status:400,message:err})
                return res.send({status:200,message:'Success',data:result})
            })
        }else{
            const sqlStr = `select * from loseSchema where type = 1`
            db.query(sqlStr,(err,result)=>{
                if(err) return res.send({status:400,message:err})
                return res.send({status:200,message:'Success',data:result})
            })
        }
    },
}

module.exports = public_handle