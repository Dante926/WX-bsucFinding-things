const db = require('../mysql/db')
// const { get } = require('../router/getdata')

const public_handle = {
    getdata: (req, res) => {
        const type = req.body.type
        if (type == 0) {
            const sqlStr = `select * from loseSchema where type = 0`
            db.query(sqlStr, (err, result) => {
                if (err) return res.send({ status: 400, message: err })
                return res.send({ status: 200, message: 'Success', data: result })
            })
        } else {
            const sqlStr = `select * from loseSchema where type = 1`
            db.query(sqlStr, (err, result) => {
                if (err) return res.send({ status: 400, message: err })
                return res.send({ status: 200, message: 'Success', data: result })
            })
        }
    },

    pushcol: (req, res) => {
        const { id, openid, type, classify1, classify2, name, date, region, call, desc, imgList, time } = req.body;
        console.log(req.body);
        if (id) {
            const sqlStr = 'INSERT INTO collection(id,openid,type,classify1,classify2,name,date,region,`call`,`desc`,imgList,time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
            db.query(sqlStr, [id, openid, type, classify1, classify2, name, date, region, call, desc, JSON.stringify(imgList), time], (err, result) => {
                if (err) return res.send({ status: 400, message: 'error:' + err })
                return res.send({ status: 200, message: 'Success', data: '收藏成功' })
            })
        }
    },

    getcol: (req, res) => {
        console.log(req.body.id);
        const { id, openid } = req.body;
        if (id && openid) {
            const sqlStr = 'SELECT * FROM collection WHERE id=? AND openid=?'
            db.query(sqlStr, [id, openid], (err, result) => {
                // 如果查询为空则未被收藏
                if (result.length === 0) {
                    return res.send({
                        status: 200,
                        message: 'Unfavorites',
                    })
                } else {
                    return res.send({
                        status: 200,
                        message: 'Bookmarked',
                    })
                }
            })
        }
    }
}

module.exports = public_handle