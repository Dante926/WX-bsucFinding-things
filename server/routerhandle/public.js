const db = require('../mysql/db')

const public_handle = {
    public: (req, res) => {
        // 接收参数
        const { type, openid, classify1, classify2, name, date, region, call, desc, imgList, time } = req.body;

        // 将数据存储到数据库closeSchema中
        const sqlStr = 'INSERT INTO loseschema (type,openid,classify1,classify2,name,date,region,`call`,`desc`,imgList,time) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        db.query(sqlStr, [type, openid, classify1, classify2, name, date, region, call, desc, JSON.stringify(imgList), time], (err, result) => {
            if (err) {
                return res.send({
                    status: 401,
                    message: '发布失败:' + err.message
                })
            } else {
                return res.send({
                    status: 200,
                    message: 'Success',
                    data: result
                })
            }
        })
    },

    getmypub: (req, res) => {
        const { openid, type } = req.body;
        if (openid) {
            const sqlStr = `select * from loseSchema where openid = ? and type = ?`
            db.query(sqlStr, [openid, type], (err, result) => {
                if (err) {
                    return res.send({
                        status: 401,
                        message: '发布失败:' + err.message
                    })
                } else {
                    return res.send({
                        status: 200,
                        message: 'Success',
                        data: result
                    })
                }
            })
        }
    }
}

module.exports = public_handle