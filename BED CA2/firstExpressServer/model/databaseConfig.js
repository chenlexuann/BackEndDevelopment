var mysql = require('mysql');
//Chen Lexuan
//DIT/FT/1B/02
//p2212562
var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "bed_dvd_db",
            dateStrings: true,
            multipleStatements: "true"
        });
        return conn;
    }
};

module.exports = dbconnect