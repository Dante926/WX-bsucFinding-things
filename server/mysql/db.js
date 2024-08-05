// 连接MySQL数据库
var mysql = require('mysql');
var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'minixunwu'
});

// 测试连接
/* db.connect(function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
    }
}); */ 

module.exports = db;