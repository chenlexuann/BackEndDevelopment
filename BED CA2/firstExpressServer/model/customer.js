var db = require('./databaseConfig.js');
//Chen Lexuan
//DIT/FT/1B/02
//p2212562
var customerDB = {
    getPayment: function (customer_id, start_date, end_date, callback) { //get user from req.params.userid
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT film.title, payment.amount, payment.payment_date FROM inventory, film, rental, customer, payment WHERE inventory.film_id = film.film_id and rental.inventory_id = inventory.inventory_id and rental.customer_id = customer.customer_id and  payment.customer_id = customer.customer_id AND rental.rental_id = payment.rental_id AND (rental.rental_date BETWEEN ? AND ?) AND customer.customer_id = ?;';
                conn.query(sql, [start_date, end_date, customer_id], function (err, result) {
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

    addCustomerAddress: function (address, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES (?, ?, ?, ?, ?, ?)';
                conn.query(sql, [address.address_line1, address.address_line2, address.district, address.city_id, address.postal_code, address.phone], function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        console.log(result)
                        return callback(null, result);
                    }
                });

            }
        });
    },

    addCustomer: function (store_id, first_name, last_name, email, address_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'INSERT INTO customer (store_id, first_name, last_name, email, address_id) VALUES (?, UPPER(?), UPPER(?), ?, ?)';
                conn.query(sql, [store_id, first_name, last_name, email, address_id], function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    deleteDefaultAddress: function (address_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'DELETE FROM `bed_dvd_db`.`address` WHERE (`address_id` = ?);';
                conn.query(sql, [address_id], function (err, result) {
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

    addRental: function (rental_date, inventory_id, customer_id, return_date, staff_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                // console.log("Connected!");
                var sql = `INSERT INTO rental(rental_date, inventory_id, customer_id, return_date, staff_id) VALUES (?, ?, ?, ?, ?);`;
                conn.query(sql, [rental_date, inventory_id, customer_id, return_date, staff_id], function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });

            }
        });
    },

    addPayment: function (customer_id, staff_id, rentalID, amount, payment_date, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `INSERT INTO payment(customer_id, staff_id, rental_id, amount, payment_date) VALUES (?, ?, ?, ?, ?);`;
                conn.query(sql, [customer_id, staff_id, rentalID, amount, payment_date], function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    addFilm: function (film, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                // console.log("Connected!");
                var sql = 'INSERT INTO film(`title`, `description`, `release_year`, `language_id`, `original_language_id`,`rental_duration`, `rental_rate`, `length`, `replacement_cost`, `rating`, `special_features`) VALUES (UPPER(?),?,?,?,?,?,?,?,?,?,?);';
                conn.query(sql, [
                    film.title,
                    film.description,
                    film.release_year,
                    film.language_id,
                    film.original_language_id,
                    film.rental_duration,
                    film.rental_rate,
                    film.length,
                    film.replacement_cost,
                    film.rating,
                    film.special_features
                ], function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });

            }
        });
    },
    defaultCategory: function (film_id, category_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'INSERT INTO `bed_dvd_db`.`film_category` (`film_id`, `category_id`) VALUES (?, ?);';
                conn.query(sql, [film_id, category_id], function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });

            }
        });
    },

}

module.exports = customerDB;