var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'us-cdbr-east-03.cleardb.com',
    user     : 'bd152fa79e96f6',
    password : 'e4c3a51f5959e49',
    database : 'heroku_4347727c70c08ae'
});

exports.MyPool = pool;