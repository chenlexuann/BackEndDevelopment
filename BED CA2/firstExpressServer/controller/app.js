//Chen Lexuan
//DIT/FT/1B/02
//p2212562
var express = require('express');
var app = express();
var user = require('../model/user.js');
var actor = require('../model/actors.js');
var customer = require('../model/customer.js')
var film_category = require('../model/film_category.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(urlencodedParser);
var verifyToken = require('../auth/verifyToken.js');
var cors = require('cors');

app.options('*', cors());
app.use(cors());


app.post('/user/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    user.loginUser(email, password, function (err, token, result) {
        if (!err) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            delete result[0]['password'];//clear the password in json data, do not send back to client
            // console.log(result);
            res.json({ success: true, UserData: JSON.stringify(result), token: token, status: 'You are successfully logged in!' });
            res.send();
        } else {
            res.status(500);
            res.send(err.statusCode);
        }
    });
});

app.post('/user/logout', function (req, res) {
    console.log("..logging out.");
    res.clearCookie('session-id'); //clears the cookie in the response
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'Log out successful!' });

});

app.put('/user', verifyToken, function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var role = req.body.role;


    user.updateUser(username, email, role, function (err, result) {
        if (!err) {
            console.log("Update successful");
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, result: result, status: 'Record updated successfully!' });
        } else {
            res.status(500);
            res.send(err.statuscode);
        }
    })
});


app.get('/user', function (req, res) {

    user.getUsers(function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send(null);
        }
    });
});

app.get('/category', function (req, res) {
    film_category.getCategory(function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send(null);
        }
    });
});

app.post('/film_categories/filmTitle/', function (req, res) {
    var film_title = req.body.film_title;
    film_category.getFilm(film_title, function (err, result) {
        if (!err) {
            return res.status(200).send(result);
        }
        else {
            let x = {
                "error_msg": "Internal server error"
            }
            return res.status(500).send(x);
        }
    });
});

app.get('/film/:film_id/', function (req, res) {
    var film_id = req.params.film_id;
    film_category.getFilmByID(film_id, function (err, result) {
        if (!err) {
            console.log(result);
            return res.status(200).send(result);
        } else {
            let x = {
                "error_msg": "Internal server error"
            }
            return res.status(500).send(x);
        }
    });
});

app.get('/film_categories/:category_id/films/:rental_rate', function (req, res) {
    var category_id = req.params.category_id;
    var rental_rate = req.params.rental_rate;
    film_category.getFilmsByRental(category_id, rental_rate, function (err, result) {
        if (!err) {
            return res.status(200).send(result);
        }
        else {
            let x = {
                "error_msg": "Internal server error"
            }
            return res.status(500).send(x);
        }
    });
});

app.get('/film_categories/films/:rental_rate', function (req, res) {
    var rental_rate = req.params.rental_rate;
    film_category.getFilmsByRentalNoCat(rental_rate, function (err, result) {
        if (!err) {
            return res.status(200).send(result);
        }
        else {
            let x = {
                "error_msg": "Internal server error"
            }
            return res.status(500).send(x);
        }
    });
});

app.get('/:film_id/actors', function (req, res) {
    film_id = req.params.film_id
    actor.getActor(film_id, function (err, result) {
        if (!err) {
            return res.status(200).send(result);
        }
        else {
            let x = {
                "error_msg": "Internal server error"
            }
            return res.status(500).send(x);
        }
    });
});

app.get('/store', function (req, res) {
    user.getStoreID(function (err, result) {
        if (!err) {
            return res.status(200).send(result);
        }
        else {
            let x = {
                "error_msg": "Internal server error"
            }
            return res.status(500).send(x);
        }
    });
});

app.get('/city', function (req, res) {
    user.getCity(function (err, result) {
        if (!err) {
            return res.status(200).send(result);
        }
        else {
            let x = {
                "error_msg": "Internal server error"
            }
            return res.status(500).send(x);
        }
    });
})

app.get('/actors', function (req, res) {
    actor.getActors(function (err, result) {
        if (!err) {
            return res.status(200).send(result);
        }
        else {
            let x = {
                "error_msg": "Internal server error"
            }
            return res.status(500).send(x);
        }
    });
});

app.get('/language', function (req, res) {
    film_category.getLanguage(function (err, result) {
        if (!err) {
            return res.status(200).send(result);
        }
        else {
            let x = {
                "error_msg": "Internal server error"
            }
            return res.status(500).send(x);
        }
    });
});



//Endpoint 3
app.post('/actors', function (req, res) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    if (first_name == '' || last_name == '') {
        let x = {
            "error_msg": "missing data"
        };
        return res.status(400).send(x);
    } else {
        actor.addActor(first_name, last_name, function (err, result) {

            if (!err) {
                let x = {
                    "actor_id": result
                };
                return res.status(201).send(x);
            } else {
                let x = {
                    "error_msg": "Internal server error"
                };
                return res.status(500).send(x);
            }
        })
    };
});

//Endpoint 4
app.put('/actors/:actor_id', function (req, res) {
    var actor_id = req.params.actor_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    if (first_name == null && last_name == null) {
        let x = {
            "error_msg": "missing data"
        }
        return res.status(400).send(x);
    } else {
        actor.updateActor(first_name, last_name, actor_id, function (err, result) {
            if (!err) {
                if (result == 0) {
                    return res.status(204).end();
                } else {
                    let x = {
                        "success_msg": "record updated"
                    };
                    return res.status(200).send(x);
                }
            } else {
                let x = {
                    "error_msg": "Internal server error"
                };
                return res.status(500).send(x);
            }
        })
    }
});

//Endpoint 5
app.delete('/actors/:actor_id', function (req, res) {
    var actor_id = req.params.actor_id;
    actor.deleteActor(actor_id, actor_id, function (err, result) {
        if (!err) {
            if (result == 0) {
                return res.status(204).end();
            } else {
                let x = {
                    "success_msg": "actor deleted"
                };
                return res.status(200).send(x);
            }
        } else {
            let x = {
                "error_msg": "Internal server error"
            };
            return res.status(500).send(x);
        }
    });
});

//Endpoint 6
app.get('/film_categories/:category_id/films', function (req, res) {
    var category_id = req.params.category_id;
    film_category.getFilms(category_id, function (err, result) {
        if (!err) {
            return res.status(200).send(result);
        }
        else {
            let x = {
                "error_msg": "Internal server error"
            }
            return res.status(500).send(x);
        }
    });
});


//Endpoint 8
app.post('/customers', function (req, res) {
    var address = req.body.address;
    if (address.address_line1 == '' ||
        address.district == '' ||
        address.city_id == '' ||
        address.postal_code == '' ||
        address.phone == '') {
        let x = { "error_msg": "missing data" };
        return res.status(400).send(x);
    } else {
        customer.addCustomerAddress(address, function (err, result) {
            if (!err) {
                var store_id = req.body.store_id;
                var first_name = req.body.first_name;
                var last_name = req.body.last_name;
                var email = req.body.email;
                var address_id = result.insertId;
                customer.addCustomer(store_id, first_name, last_name, email, address_id, function (err, result) {
                    if (!err) {
                        let x = { "customer_id": result.insertId };
                        return res.status(201).send(x);
                    } else {
                        if (first_name == '' || last_name == '') {
                            let x = { "error_msg": "missing data" };
                            return res.status(400).send(x);
                        } else if (err.code == 'ER_DUP_ENTRY') {
                            customer.deleteDefaultAddress(address_id, function (err, result) {
                                if (!err) {
                                    let x = { "error_msg": "email already exist" };
                                    return res.status(409).send(x);
                                } else {
                                    let x = { "error_msg": "Internal server error" };
                                    return res.status(500).send(x);
                                }
                            })
                        } else {
                            let x = { "error_msg": "Internal server error" };
                            return res.status(500).send(x);
                        }
                    }
                });

            } else {

                let x = { "error_msg": "Internal server error" };
                return res.status(500).send(x);

            }
        });
    }
});

//Endpoint 9
app.post('/rental/:customer_id', function (req, res) {
    var rental_date = req.body.rental_date;
    var inventory_id = req.body.inventory_id;
    var return_date = req.body.return_date;
    var staff_id = req.body.staff_id;
    var amount = req.body.amount;
    var payment_date = req.body.payment_date;
    var customer_id = req.params.customer_id;
    if (rental_date == '' ||
        inventory_id == '' ||
        return_date == '' ||
        staff_id == '' ||
        amount == '' ||
        payment_date == '' ||
        customer_id == '') {
        let x = { "error_msg": "missing data" };
        return res.status(400).send(x);
    } else {
        customer.addRental(rental_date, inventory_id, customer_id, return_date, staff_id, function (err, result) {
            var rentalID = result.insertId;
            if (!err) {
                customer.addPayment(customer_id, staff_id, rentalID, amount, payment_date, function (err, result) {
                    console.log(result);
                    var paymentID = result.insertId;
                    if (!err) {
                        let x = {
                            rental_id: rentalID,
                            payment_id: paymentID,
                        };
                        return res.status(201).send(x);
                    } else {
                        let x = { "error_msg": "Internal server error" };
                        return res.status(500).send(x);
                    }
                });
            } else {
                let x = { "error_msg": "Internal server error" };
                return res.status(500).send(x);
            }
        });
    }
});

//Endpoint 10
app.post('/film', function (req, res) {
    var film = req.body.film;
    customer.addFilm(film, function (err, result) {
        if (!err) {
            let film_id = result.insertId
            console.log(film_id);
            customer.defaultCategory(film_id, film.category_id, function (err, result) {
                if (!err) {
                    let x = { "film_id": result.insertId };
                    return res.status(201).send(x);
                } else {
                    let x = { "error_msg": "Internal server error" };
                    return res.status(500).send(x);
                }
            });
        } else {
            if (err.code == 'WARN_DATA_TRUNCATED') {
                let x = { "error_msg": "Please enter correct format for either RATINGS or SPECIAL_FEATURES" };
                return res.status(409).send(x);
            } else if (err.code == 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
                let x = { "error_msg": "Please enter values!" };
                return res.status(409).send(x);
            } else if (err.code == 'ER_WARN_DATA_OUT_OF_RANGE') {
                let x = { "error_msg": "Please enter correct format for release year" };
                return res.status(409).send(x);
            } else {
                let x = { "error_msg": "Internal server error" };
                return res.status(500).send(x);
            }
        }
    });
});

module.exports = app;