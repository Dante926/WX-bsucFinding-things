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
            const sqlStr = `select * from loseSchema where openid = ? and type = ? order by time desc`
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
    },

    delemypub: (req, res) => {
        const { _id } = req.body;
        console.log(_id);
        const sqlStr = 'DELETE FROM loseSchema WHERE _id = ?';
        db.query(sqlStr, [_id], (err, result) => {
            if (err) return res.send({
                status: 500,
                message: 'Error',
                error: err.message
            })
            else return res.send({
                status: 200,
                message: 'Success',
                data: result
            })
        })
    },

    getpubdata: (req, res) => {
        const { id } = req.body;
        console.log(id);

        const sqlStr = 'SELECT * FROM loseSchema WHERE _id = ?'
        db.query(sqlStr, [id], (err, result) => {
            console.log(result);

            if (err) return res.send({
                status: 500,
                message: 'Error',
                error: err.message
            })
            else return res.send({
                status: 200,
                message: 'Success',
                data: result
            })
        })
    },

    updatapub: (req, res) => {
        const { type, openid, classify1, classify2, name, date, region, call, desc, imgList, time, id } = req.body;
        // 处理图片，将图片变成字符串数组
        const imgListStr = JSON.stringify(imgList);
        // 使用反引号避免关键字冲突
        const sqlStr = `UPDATE loseSchema 
                        SET type = ?, 
                            classify1 = ?, 
                            classify2 = ?, 
                            name = ?, 
                            date = ?, 
                            region = ?, 
                            \`call\` = ?, 
                            \`desc\` = ?, 
                            \`imgList\` = ?, 
                            time = ? 
                        WHERE openid = ? AND _id = ?`;
        db.query(sqlStr, [type, classify1, classify2, name, date, region, call, desc, imgListStr, time, openid, id], (err, result) => {
            if (err) {
                console.error('SQL error:', err);
                return res.status(500).send({ status: 500, error: err.message });
            }
            if (result.affectedRows !== 1) {
                return res.status(500).send({ status: 500, message: 'Fail' });
            }
            res.status(200).send({ status: 200, message: 'Success', data: result });
        });
    }

}

module.exports = public_handle