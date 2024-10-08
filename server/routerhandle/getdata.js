const db = require('../mysql/db')
// const { get } = require('../router/getdata')

const public_handle = {
    getdata: (req, res) => {
        const type = req.body.type
        if (type == 0) {
            const sqlStr = `select * from loseSchema where type = 0 ORDER BY time DESC`
            db.query(sqlStr, (err, result) => {
                if (err) return res.send({ status: 400, message: err })
                return res.send({ status: 200, message: 'Success', data: result })
            })
        } else {
            const sqlStr = `select * from loseSchema where type = 1 ORDER BY time DESC`
            db.query(sqlStr, (err, result) => {
                if (err) return res.send({ status: 400, message: err })
                return res.send({ status: 200, message: 'Success', data: result })
            })
        }
    },

    pushcol: (req, res) => {
        const { id, openid, type, classify1, classify2, name, date, region, call, desc, imgList, time } = req.body;
        if (id) {
            const sqlStr = 'INSERT INTO collection(id,openid,type,classify1,classify2,name,date,region,`call`,`desc`,imgList,time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
            db.query(sqlStr, [id, openid, type, classify1, classify2, name, date, region, call, desc, JSON.stringify(imgList), time], (err, result) => {
                if (err) return res.send({ status: 400, message: 'error:' + err })
                return res.send({ status: 200, message: 'Success', data: '收藏成功' })
            })
        }
    },

    getcol: (req, res) => {
        const { id, openid } = req.body;
        if (id && openid) {
            const sqlStr = 'SELECT * FROM collection WHERE id=? AND openid=? ORDER BY time DESC;'
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
    },

    delcol: (req, res) => {
        const { id, openid } = req.body;
        // 去数据库查询是否有拥有id和openid的数据
        const sqlStr = 'SELECT * FROM collection WHERE id=? AND openid=?'
        db.query(sqlStr, [id, openid], (err, result) => {
            // 如果有则删除
            if (result.length > 0) {
                const sqlStr = 'DELETE FROM collection WHERE id=? AND openid=?'
                db.query(sqlStr, [id, openid], (err, result) => {
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
            } else {
                // 不存在纪录 取消收藏失败
                return res.send({
                    status: 401,
                    message: '取消收藏失败'
                })
            }
        })
    },

    getcoldata: (req, res) => {
        const { openid, type } = req.body;
        // 通过openid和type字段查询数据
        const sqlStr = `
        SELECT * 
        FROM collection 
        WHERE openid = ? AND type = ? 
        ORDER BY STR_TO_DATE(time, '%Y/%m/%d %H:%i') DESC
        `;

        db.query(sqlStr, [openid, type], (err, result) => {
            if (err) {
                return res.send({
                    status: 401,
                    message: '查询失败:' + err.message
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

    getclatwo: (req, res) => {
        const { type, classifytwo } = req.body;
        // 根据分类和二级分类获取数据
        const sqlStr = 'select * from loseSchema where type = ? and classify2 LIKE ?'
        db.query(sqlStr, [type, `%${classifytwo}%`], (err, result) => {
            if (err) {
                return res.send({
                    status: 500,
                    message: '获取数据失败'
                })
            }
            return res.send({
                status: 200,
                message: '获取数据成功',
                data: result
            })
        })
    },

    getsearch: (req, res) => {
        const { name } = req.body;
        const sqlStr = `SELECT * FROM loseSchema WHERE name LIKE ?`
        db.query(sqlStr, [`%${name}%`], (err, result) => {
            if (err) {
                return res.send({
                    status: 500,
                    message: '获取数据失败'
                })
            }
            return res.send({
                status: 200,
                message: 'Success',
                data: result
            })
        })
    },

    pushadvice: (req, res) => {
        const { name, contact, feedback, openid } = req.body
        // 生成当前北京时间
        // 获取当前时间并转换为北京时间
        const now = new Date();
        const beijingTime = new Date(now.getTime() + (8 * 60 * 60 * 1000)); // UTC+8
        const time = beijingTime.toISOString().slice(0, 19).replace('T', ' '); // 格式化为 'YYYY-MM-DD HH:MM:SS'

        const sqlStr = `insert into feedback (name,contact,feedback,openid,time) values (?,?,?,?,?)`
        db.query(sqlStr, [name, contact, feedback, openid, time], (err, result) => {
            if (err) {
                return res.send({
                    status: 500,
                    message: '反馈数据失败'
                })
            }
            return res.send({
                status: 200,
                message: 'Success',
                data: result
            })
        })
    },

    pulladvice: (req, res) => {
        const { page, size } = req.body;
        const offset = (page - 1) * size;
        const limit = size;

        // 查询符合条件的所有记录
        const sqlCount = 'SELECT COUNT(*) AS total FROM feedback';
        const sqlData = 'SELECT * FROM feedback LIMIT ? OFFSET ?';

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
    },

    deladvice: (req, res) => {
        const { id } = req.body
        const sqlStr = `delete from feedback where id = ?`
        db.query(sqlStr, [id], (err, result) => {
            if (err) {
                return res.send({
                    status: 500,
                    message: '删除数据失败'
                })
            } else {
                return res.send({
                    message: 'Success',
                    status: 200,
                })
            }

        })
    },

    pullbanner: (req, res) => {
        const sqlStr = 'select * from bannerSchema ORDER BY \`index\` ASC'
        db.query(sqlStr, (err, result) => {
            if (err) {
                console.log(err);
                
                return res.send({
                    status: 500,
                    message: '获取数据失败'
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

    pushbanner: (req, res) => {
        const { imgurl, index, title, desc } = req.body;
        const now = new Date();
        const beijingTime = new Date(now.getTime() + (8 * 60 * 60 * 1000));
        const time = beijingTime.toISOString().slice(0, 19).replace('T', ' ');
        const sqlStr = `INSERT INTO bannerSchema (imgurl, \`index\`, title, \`desc\`, time) VALUES (?, ?, ?, ?, ?)`;

        db.query(sqlStr, [imgurl, index, title, desc, time], (err, result) => {
            if (err) {
                console.log(err);
                return res.send({
                    status: 500,
                    message: '添加数据失败',
                    err
                });
            } else {
                return res.send({
                    status: 200,
                    message: 'Success',
                    data: result[0]
                });
            }
        });
    },

    delbanner: (req, res) => {
        const { id } = req.body
        const sqlStr = `delete from bannerSchema where id = ?`
        db.query(sqlStr, [id], (err, result) => {
            if (err) {
                return res.send({
                    status: 500,
                    message: '删除数据失败'
                })
            } else {
                return res.send({
                    message: 'Success',
                    status: 200,
                    data: result[0]
                })
            }
        })
    },

    updbanner: (req, res) => {
        const { id, imgurl, index, title, desc } = req.body
        const now = new Date();
        const beijingTime = new Date(now.getTime() + (8 * 60 * 60 * 1000));
        const time = beijingTime.toISOString().slice(0, 19).replace('T', ' ');
        const sqlStr = `update bannerSchema set imgurl = ?, \`index\` = ?, title = ?,\`desc\` = ? ,time = ? where id = ?`
        db.query(sqlStr, [imgurl, index, title, desc, time, id], (err, result) => {
            if (err) {
                console.log(err);

                return res.send({
                    status: 500,
                    message: '更新数据失败'
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
}

module.exports = public_handle