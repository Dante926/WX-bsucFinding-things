const db = require('../mysql/db')

const public_handle = {

    login: (req, res) => {
        const { username, password } = req.body;
        const sqlStr = 'select * from SuperUsers where username = ?'
        db.query(sqlStr, username, (err, result) => {
            if (err) return res.send({ status: 500, message: '登录失败', data: err })
            if (result.length === 0) return res.send({ status: 500, message: '用户名错误' })
            if (result[0].password === password) return res.send({ status: 200, message: '登录成功', data: result[0] })
            else return res.send({ status: 500, message: '密码错误' })
        })
    },

    getdata: (req, res) => {
        const { type, page, size } = req.body;
        const offset = (page - 1) * size;
        const limit = size;

        // 查询符合条件的所有记录
        const sqlCount = 'SELECT COUNT(*) AS total FROM loseSchema WHERE type = ?';
        const sqlData = 'SELECT * FROM loseSchema WHERE type = ? LIMIT ? OFFSET ?';

        // 执行查询记录总数的 SQL 查询
        db.query(sqlCount, [type], (err, countResults) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const total = countResults[0].total;

            // 执行查询当前页数据的 SQL 查询
            db.query(sqlData, [type, limit, offset], (err, dataResults) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.send({
                    data: dataResults,
                    total: total
                });
            });
        });
    },

    deledata: (req, res) => {
        const { _id } = req.body;
        // 根据_id 和 type删除数据
        const sqlStr = 'DELETE FROM loseSchema WHERE _id=?'
        db.query(sqlStr, [_id], (err, result) => {
            if (err) {
                return res.send({
                    status: 401,
                    message: '删除失败:' + err.message
                })
            } else {
                return res.send({
                    status: 200,
                    message: 'Success',
                })
            }
        })
    },

    getuser: (req, res) => {
        const { page, size, search } = req.body;
        const offset = (page - 1) * size;
        const limit = size;

        if (search) {
            const sqlCount = 'SELECT COUNT(*) AS total FROM userSchema where username like ?';
            const sqlStr = 'select * from userSchema where username like ? limit ? OFFSET ?'
            // 执行查询记录总数的 SQL 查询
            db.query(sqlCount, [`%${search}%`], (err, countResults) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                const total = countResults[0].total;

                // 执行查询当前页数据的 SQL 查询
                db.query(sqlStr, [`%${search}%`, limit, offset], (err, dataResults) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    res.send({
                        data: dataResults,
                        total: total
                    });
                });
            });

        } else {
            // 查询符合条件的所有记录
            const sqlCount = 'SELECT COUNT(*) AS total FROM userSchema';
            const sqlData = 'SELECT * FROM userSchema LIMIT ? OFFSET ?';

            // 执行查询记录总数的 SQL 查询
            db.query(sqlCount, (err, countResults) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                const total = countResults[0].total;

                // 执行查询当前页数据的 SQL 查询
                db.query(sqlData, [limit, offset], (err, dataResults) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    res.send({
                        data: dataResults,
                        total: total
                    });
                });
            });
        }

    },

    deleuser: (req, res) => {
        const { id } = req.body;
        // 根据_id 和 type删除数据
        const sqlStr = 'DELETE FROM userSchema WHERE id=?'
        db.query(sqlStr, [id], (err, result) => {
            if (err) {
                return res.send({
                    status: 401,
                    message: '删除失败:' + err.message
                })
            } else {
                return res.send({
                    status: 200,
                    message: 'Success',
                })
            }
        })
    },

    getadmin: (req, res) => {
        const { page, size, search } = req.body;
        const offset = (page - 1) * size;
        const limit = size;

        if (search) {
            const sqlCount = 'SELECT COUNT(*) AS total FROM SuperUsers where username like ?';
            const sqlStr = 'select * from SuperUsers where username like ? limit ? OFFSET ?'
            // 执行查询记录总数的 SQL 查询
            db.query(sqlCount, [`%${search}%`], (err, countResults) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                const total = countResults[0].total;

                // 执行查询当前页数据的 SQL 查询
                db.query(sqlStr, [`%${search}%`, limit, offset], (err, dataResults) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    res.send({
                        data: dataResults.map(item => {
                            return {
                                ...item,
                                role: Number(item.role)
                            }
                        }),
                        total: total
                    });
                });
            });

        } else {
            // 查询符合条件的所有记录
            const sqlCount = 'SELECT COUNT(*) AS total FROM SuperUsers';
            const sqlData = 'SELECT * FROM SuperUsers LIMIT ? OFFSET ?';

            // 执行查询记录总数的 SQL 查询
            db.query(sqlCount, (err, countResults) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                const total = countResults[0].total;

                // 执行查询当前页数据的 SQL 查询
                db.query(sqlData, [limit, offset], (err, dataResults) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    res.send({
                        data: dataResults.map(item => {
                            return {
                                ...item,
                                role: Number(item.role)
                            }
                        }),
                        total: total
                    });
                });
            });
        }
    },

    deleadmin: (req, res) => {
        const { id, role } = req.body;
        if (role == 1) {
            return res.send({
                status: 500,
                message: 'NoPower',
            })
        } else {
            const sqlStr = 'delete from SuperUsers where id = ?';
            db.query(sqlStr, id, (err, result) => {
                if (err) return res.send({ status: 500, message: '删除失败', err });

                return res.send({
                    status: 200,
                    message: 'Success',
                    data: result
                });
            })
        }

    },

    addadmin: (req, res) => {
        const { username, password, role, nickname } = req.body;
        console.log(req.body);
        const create_time = new Date().getTime();
        // 检查用户名是否冲突
        const sqlCheck = 'select * from SuperUsers where username = ?'
        db.query(sqlCheck, [username], (err, result) => {
            if (err) return res.send({ status: 500, message: '用户名查询失败', err });
            if (result.length > 0) {
                return res.send({ status: 500, message: '用户名已存在' });
            } else {
                const sqlStr = 'insert into SuperUsers (username,password,role,nickname,create_time) values (?,?,?,?,?)'
                db.query(sqlStr, [username, password, role, nickname, create_time], (err, result) => {
                    if (err) return res.send({ status: 500, message: '添加失败', err });
                    return res.send({
                        status: 200,
                        message: 'Success',
                        data: result
                    });
                })
            }
        })


    },

    adminauth: (req, res) => {
        const { username } = req.body;
        const sqlStr = 'select * from SuperUsers where username = ?'
        db.query(sqlStr, [username], (err, result) => {
            if (result[0].role === 0) {
                return res.send({
                    status: 200,
                    message: 'Success',
                    data: result
                });
            } else {
                return res.send({
                    status: 500,
                    message: 'NoPower',
                })
            }
        })
    },

    editadmin: (req, res) => {
        const { id, username, password, role, nickname } = req.body;
        console.log(req.body);
        // 查询用户名是否存在
        const sqlCheck = 'select * from SuperUsers where username = ? and id != ?'
        /* 
            添加id !=1 是为了可以修改我们自己本身的信息
            当我们自己修改自己的信息时如果没有id!=1的话，就会导致查询用户名时显示用户名已存在
        */
        db.query(sqlCheck, [username, id], (err, result) => {
            // 查询用户名失败
            if (err) return res.send({ status: 500, message: '用户名查询失败', err });
            // 用户名已存在
            if (result.length > 0) {
                return res.send({ status: 500, message: '用户名已存在' });
            } else {
                /* 根据id更新用户更改数据 */
                const sqlStr = 'update SuperUsers set username = ?,password = ?,role = ?,nickname = ? where id = ?'
                db.query(sqlStr, [username, password, role, nickname, id], (err, result) => {
                    if (err) return res.send({ status: 500, message: '编辑失败' })
                    return res.send({
                        status: 200,
                        message: 'Success',
                        data: result
                    });
                })
            }
        })
    }
}

module.exports = public_handle