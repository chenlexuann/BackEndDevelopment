var db = require('./databaseConfig.js');
//Chen Lexuan
//DIT/FT/1B/02
//p2212562
var film_categoryDB = {
    getFilms: function (category_id, callback) { //get user from req.params.userid
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT film.film_id, film.title, category.name as category, film.release_year, film.description, film.rating from film join film_category on film_category.film_id=film.film_id join category on category.category_id=film_category.category_id WHERE category.category_id =?;';
                conn.query(sql, [category_id], function (err, result) {
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
    getActors: function (film_id, callback) { //get user from req.params.userid
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

    getFilm: function (film_title, callback) { //get user from req.params.userid
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!"); //slowly do join statement
                var sql = 'SELECT * FROM film where title LIKE UPPER(?);';
                conn.query(sql, ['%' + film_title + '%'], function (err, result) {
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

    getFilmsByRental: function (category_id, rental_rate, callback) { //get user from req.params.userid
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT film.film_id, film.title, category.name as category, film.release_year, film.description, film.rating from film join film_category on film_category.film_id=film.film_id join category on category.category_id=film_category.category_id WHERE category.category_id =? and film.rental_rate <=? ;';
                conn.query(sql, [category_id, rental_rate], function (err, result) {
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


    getFilmsByRentalNoCat: function (rental_rate, callback) { //get user from req.params.userid
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT film.film_id, film.title, category.name as category, film.release_year, film.description, film.rating from film join film_category on film_category.film_id=film.film_id join category on category.category_id=film_category.category_id WHERE film.rental_rate <=? ;';
                conn.query(sql, [rental_rate], function (err, result) {
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

    getFilmByID: function (film_id, callback) { //get user from req.params.userid
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT film.title, film.description, film.release_year, film.rental_duration, film.rental_rate, film.length, film.rating, film.special_features, category.name as cat, language.name from film join film_category on film_category.film_id=film.film_id join category on category.category_id=film_category.category_id join bed_dvd_db.language on language.language_id=film.language_id where film.film_id =?;';
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

    getCategory: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT category_id as id, name FROM bed_dvd_db.category;';
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

    getLanguage: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT language_id, name FROM bed_dvd_db.language;';
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
}

module.exports = film_categoryDB;