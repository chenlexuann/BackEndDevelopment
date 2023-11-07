var db = require('./databaseConfig.js');
//Chen Lexuan
//DIT/FT/1B/02
//p2212562
var actorDB = {
    getActor: function (film_id, callback) { //get user from req.params.userid
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT actor.first_name, actor.last_name FROM actor join film_actor on film_actor.actor_id = actor.actor_id join film on film.film_id= film_actor.film_id where film.film_id = ?;';
                conn.query(sql, [film_id], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    getActors: function (callback) { //get all users
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT actor_id, first_name, last_name FROM actor ORDER BY first_name;';
                conn.query(sql, function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    addActor: function (first_name, last_name, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'Insert into actor(first_name, last_name) values(UPPER(?), UPPER(?))';
                conn.query(sql, [first_name, last_name], function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result.insertId);
                    }
                });

            }
        });
    },

    updateActor: function (first_name, last_name, actor_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                if (first_name != undefined && last_name != undefined) {
                    console.log("Connected!");
                    var sql = 'UPDATE actor SET first_name = ?, last_name = ? WHERE actor_id = ?;';
                    conn.query(sql, [first_name, last_name, actor_id], function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err, null);
                        } else {
                            return callback(null, result.affectedRows);
                        }
                    });
                } else if (first_name != undefined && last_name == undefined) {
                    console.log("Connected!");
                    var sql = 'UPDATE actor SET first_name = ? WHERE actor_id = ?;';
                    conn.query(sql, [first_name, actor_id], function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err, null);
                        } else {
                            return callback(null, result.affectedRows);
                        }
                    });
                } else if (first_name == undefined && last_name != undefined) {
                    console.log("Connected!");
                    var sql = 'UPDATE actor SET last_name = ? WHERE actor_id = ?;';
                    conn.query(sql, [last_name, actor_id], function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err, null);
                        } else {
                            return callback(null, result.affectedRows);
                        }
                    });
                } else {
                    return "some error"
                }
            }
        });
    },

    deleteActor: function (actor_id, actor_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'DELETE FROM film_actor WHERE actor_id = ?; DELETE FROM actor WHERE (actor_id = ?);';
                conn.query(sql, [actor_id, actor_id], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result.affectedRows);
                    }
                });
            }
        });
    },
}

module.exports = actorDB;