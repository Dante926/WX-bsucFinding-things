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
        const deleteLoseSchema = 'DELETE FROM loseSchema WHERE _id = ?';
        const deleteCollection = 'DELETE FROM collection WHERE id = ?';

        // 开始事务
        db.beginTransaction((err) => {
            if (err) {
                return res.send({
                    status: 500,
                    message: 'Error starting transaction',
                    error: err.message
                });
            }

            // 删除 loseSchema 表中的记录
            db.query(deleteLoseSchema, [_id], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        res.send({
                            status: 500,
                            message: 'Error deleting from loseSchema',
                            error: err.message
                        });
                    });
                }

                // 删除 collection 表中的记录
                db.query(deleteCollection, [_id], (err, result) => {
                    if (err) {
                        return db.rollback(() => {
                            res.send({
                                status: 500,
                                message: 'Error deleting from collection',
                                error: err.message
                            });
                        });
                    }

                    // 提交事务
                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                res.send({
                                    status: 500,
                                    message: 'Error committing transaction',
                                    error: err.message
                                });
                            });
                        }
                        res.send({
                            status: 200,
                            message: 'Success'
                        });
                    });
                });
            });
        });
    },

    getpubdata: (req, res) => {
        const { id } = req.body;

        const sqlStr = 'SELECT * FROM loseSchema WHERE _id = ?'
        db.query(sqlStr, [id], (err, result) => {

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
    },

    upcomment: (req, res) => {
        const { avatarUrl, nickName, content, time, _id } = req.body;

        // 创建新的评论对象
        const newComment = {
            avatarUrl,
            nickName,
            content,
            time,
        };

        // 查询现有评论列表
        const selectSql = 'SELECT commentList FROM loseSchema WHERE _id = ?';
        db.query(selectSql, _id, (err, result) => {
            if (err) return res.send({ status: 500, message: 'Failed', error: err.message });
            if (result.length === 0) return res.send({ status: 404, message: 'Not Found' });

            let commentList = [];
            try {
                // 解析现有评论列表
                if (result[0].commentList) {
                    commentList = JSON.parse(result[0].commentList);

                    // 如果解析后的数据不是数组，将其初始化为空数组
                    if (!Array.isArray(commentList)) {
                        console.warn('commentList is not an array, initializing as empty array.');
                        commentList = [];
                    }
                }
            } catch (parseErr) {
                return res.send({ status: 500, message: 'Failed to parse commentList', error: parseErr.message });
            }

            // 添加新评论到评论列表
            commentList.push(newComment);

            // 将评论列表转换为 JSON 字符串
            const commentListStr = JSON.stringify(commentList);

            // 更新数据库中的评论列表
            const updateSql = 'UPDATE loseSchema SET commentList = ? WHERE _id = ?';
            db.query(updateSql, [commentListStr, _id], (err, result) => {
                if (err) return res.send({ status: 500, message: 'Failed', error: err.message });
                if (result.affectedRows !== 1) return res.send({ status: 500, message: 'Failed' });
                res.send({ status: 200, message: 'Success', data: newComment });
            });
        });
    },

    getcomment: (req, res) => {
        const { _id } = req.body;
        console.log(_id);

        const sqlStr = 'SELECT commentList FROM loseSchema WHERE _id = ?';
        db.query(sqlStr, _id, (err, result) => {
            if (err) return res.send({ status: 500, message: 'Failed', error: err.message });
            if (result.length !== 1) return res.send({ status: 500, message: 'Failed' });
            res.send({ status: 200, message: 'Success', data: result[0] });
        })
    },

    confirm: (req, res) => {
        const { desc, img_url, openid, _id } = req.body;

        // 数据验证
        if (typeof desc !== 'string' || typeof img_url !== 'string' || typeof openid !== 'string') {
            return res.send({ status: 400, message: 'Invalid input' });
        }

        // 创建新的认领信息对象
        const newClaimInfo = { desc, img_url, openid };

        // 查询现有评论列表
        const selectSql = 'SELECT claimInfo FROM loseSchema WHERE _id = ?';
        db.query(selectSql, _id, (err, result) => {
            if (err) return res.send({ status: 500, message: 'Failed', error: err.message });
            if (result.length === 0) return res.send({ status: 404, message: 'Not Found' });

            let claimInfo = [];
            try {
                if (result[0].claimInfo) {
                    claimInfo = JSON.parse(result[0].claimInfo);

                    // 如果解析后的数据不是数组，将其初始化为空数组
                    if (!Array.isArray(claimInfo)) {
                        console.warn('claimInfo is not an array, initializing as empty array.');
                        claimInfo = [];
                    }
                }
            } catch (parseErr) {
                return res.send({ status: 500, message: 'Failed to parse claimInfo', error: parseErr.message });
            }

            // 添加新评论到评论列表
            claimInfo.push(newClaimInfo);

            // 将评论列表转换为 JSON 字符串
            const claimInfoStr = JSON.stringify(claimInfo);

            // 更新数据库中的评论列表和状态
            const updateSql = 'UPDATE loseSchema SET claimInfo = ?, status = 1 WHERE _id = ?';
            db.query(updateSql, [claimInfoStr, _id], (err, result) => {
                if (err) return res.send({ status: 500, message: 'Failed', error: err.message });
                if (result.affectedRows !== 1) return res.send({ status: 500, message: 'Failed' });
                return res.send({ status: 200, message: 'Success', data: newClaimInfo });
            });
        });
    },

    toconfirm: (req, res) => {
        const { _id, status } = req.body;
        // 根据id更改status状态
        const sqlStr = `UPDATE loseSchema SET status = ? WHERE _id = ?`;
        db.query(sqlStr, [status, _id], (err, result) => {
            if (err) return res.send({ status: 500, message: 'Error' });
            if (result.affectedRows === 1) {
                return res.send({ status: 200, message: 'Success' });
            }
        });
    }
}

module.exports = public_handle