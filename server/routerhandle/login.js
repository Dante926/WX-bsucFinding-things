const db = require('../mysql/db')

const public_handle = {
    register: (req, res) => {
        const { username, password, date } = req.body;
        // 查询用户名是否被占用
        const sqlStr = 'select * from userSchema where username = ?'
        db.query(sqlStr, username, (err, result) => {
            if (err) return res.send({ status: 500, message: '查询用户名是否重复失败...', err })
            if (result.length > 0) {
                // 如果被占用
                return res.send({ status: 500, message: '用户名已被占用...' })
            } else {
                // 如果未被占用
                const sqlStr = 'insert into userSchema (username,password,date) value (?,?,?)'
                db.query(sqlStr, [username, password, date], (err, result) => {
                    if (err) {
                        // 注册失败
                        return res.send({ status: 500, message: '注册失败...', err })
                    } else {
                        // 注册成功
                        return res.send({
                            status: 200,
                            message: '注册成功...',
                            data: result
                        })
                    }
                })
            }
        })
    },

    login: (req, res) => {
        const { username, password } = req.body;
        const sqlStr = 'select * from userSchema where username = ?'
        db.query(sqlStr, username, (err, result) => {
            if (err) return res.send({ status: 500, message: '登录失败', data: err })
            if (result.length === 0) {
                return res.send({ status: 500, message: '用户名错误' })
            } else {
                if (result[0].password === password) {
                    return res.send({ status: 200, message: '登录成功' })
                } else {
                    return res.send({ status: 500, message: '密码错误' })
                }
            }
        })
    }
}

module.exports = public_handle