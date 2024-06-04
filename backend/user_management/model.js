const bcrypt = require('bcrypt');

hashPassword = function (password) {
    let hash = bcrypt.hashSync(password, 10);
    return hash;
}

function checkUsername(name) {
    return new Promise(function (resolve, reject) {
        var mysql = require('mysql2');

        var con = mysql.createConnection({ host: 'localhost', user: 'root', password: 'root', database: 'fosa_database' });
        con.connect(function (err) {
            if (err) return reject(err);
            console.log("Connected!");
        });

        con.query('select count (*) as c from users where username=?', [name], function (err, rows, fields) {
            if (err) return reject(err);
            con.end();
            console.log("checkUsername" + rows[0].c);
            if (rows[0].c == 0) resolve(false);
            else resolve(true);
        });
    });

}

function checkEmail(email) {
    return new Promise(function (resolve, reject) {
        var mysql = require('mysql2');

        var con = mysql.createConnection({ host: 'localhost', user: 'root', password: 'root', database: 'fosa_database' });
        con.connect(function (err) {
            if (err) return reject(err);
            console.log("Connected!");
        });

        con.query('select count (*) as c from users where email=?', [email], function (err, rows, fields) {
            if (err) return reject(err);
            con.end();
            console.log("check email:" + rows[0].c);
            if (rows[0].c == 0) resolve(false);
            else resolve(true);
        });
    });

}

function addUser(name, email, password) {
    return new Promise(function (resolve, reject) {
        var mysql = require('mysql2');

        var con = mysql.createConnection({ host: 'localhost', user: 'root', password: 'root', database: 'fosa_database' });
        con.connect(function (err) {
            if (err) return reject(err);
            console.log("Connected!");
        });
        let hash = hashPassword(password);

        con.query('insert into users(username,email,password) values (?,?,?)', [name, email, hash], function (err, rows, fields) {

            if (err) return reject(err);
            con.end();
            resolve(true);

        })

    })
}

function addReview(FootwearID, recommendation_description, review, rating) {
    return new Promise(function (resolve, reject) {
        var mysql = require('mysql2');

        var con = mysql.createConnection({ host: 'localhost', user: 'root', password: 'root', database: 'fosa_database' });
        con.connect(function (err) {
            if (err) return reject(err);
            console.log("Connected!");
        });

        con.query('insert into reviews(FootwearID,recommendation_description,review,rating) values (?,?,?,?)', [FootwearID, recommendation_description, review, rating], function (err, rows, fields) {
            if (err) return reject(err);
            con.end();
            resolve(true);
        })
    })
}

function removeUser(username) {
    return new Promise(function (resolve, reject) {
        var mysql = require('mysql2');
        
        const con = mysql.createConnection({ host: 'localhost', user: 'root', password: 'root', database: 'fosa_database' });

        con.connect(function (err) {
            if (err) return reject(err);
            console.log("Connected!");
        });

        con.query('DELETE FROM Users WHERE username = ?', [username], function (err, results) {
            if (err) return reject(err);
            con.end();
            resolve(results.affectedRows > 0);
        });
    });
}

module.exports.checkStatus = function (username) {
    return new Promise(function (resolve, reject) {
        var mysql = require('mysql2');

        var con = mysql.createConnection({ host: 'localhost', user: 'root', password: 'root', database: 'fosa_database' });

        con.connect(function (err) {
            if (err) return reject(err);
            console.log("Connected!");
        });

        con.query('select status from users where username=?', [username], function (err, rows, fields) {
            if (err) return reject(err);
            con.end();
            if (rows[0].status == 1) resolve(true);
            else resolve(false);
        })

    })
}


module.exports.login = function (user_name, password) {
    return new Promise(function (resolve, reject) {
        var mysql = require('mysql2');

        var con = mysql.createConnection({ host: 'localhost', user: 'root', password: 'root', database: 'fosa_database' });

        con.connect(function (err) {
            if (err) return reject(err);
            console.log("Connected!");
        });
        console.log("username:" + user_name);
        con.query('select password from users where username=? and status=0', [user_name], function (err, rows, fields) {
            if (err) return reject(false);
            con.end();
            if (rows[0] == null || !rows[0]) resolve(false);
            else {
                let hash = rows[0].password;
                console.log("password:" + hash);
                if (hash)
                    resolve(bcrypt.compareSync(password, hash));
                else reject(false);
            }

        });

    })
}

module.exports.getId = function (username) {
    return new Promise(function (resolve, reject) {
        var mysql = require('mysql2');
        console.log("get id:" + username);
        var con = mysql.createConnection({ host: 'localhost', user: 'root', password: 'root', database: 'fosa_database' });

        con.connect(function (err) {
            if (err) return reject(err);
            console.log("Connected!");
        });

        con.query('select userId from users where username=? or email=?', [username, username], function (err, rows, fields) {
            if (err) return reject(err);
            con.end();
            if (rows[0])
                resolve(rows[0].userId);
            else reject(err);
        });

    })
}

module.exports.getUsername = function (userID) {
    return new Promise(function (resolve, reject) {
        var mysql = require('mysql2');
        console.log("get USERNAME for:" + userID);
        var con = mysql.createConnection({ host: 'localhost', user: 'root', password: 'root', database: 'fosa_database' });

        con.connect(function (err) {
            if (err) return reject(err);
            console.log("Connected!");
        });

        con.query('select username from users where userId=?', [userID], function (err, rows, fields) {
            if (err) return reject(err);
            con.end();

            resolve(rows[0].username);

        });

    })
}

module.exports.register = function (name, pass, email) {
    return new Promise(function (resolve, reject) {
        console.log("register " + name + " " + email + " " + pass);

        checkEmail(email).then(function (bool) {
            if (bool) reject('account already exists');
            else {

                checkUsername(name).then(function (bool1) {
                    if (bool1) reject('username already taken');
                    else {
                        addUser(name, email, pass).then(function (bool2) {
                            if (bool2) {
                                resolve('user registered succesfully');
                            }
                        }).catch((err) => setImmediate(() => { console.log(err); reject(err); }));
                    }
                }).catch((err) => setImmediate(() => { console.log(err); reject(err); }));
            }
        });
    })
}

module.exports.review = function (FootwearID, recommendation_description, review, rating) {
    return new Promise(function (resolve, reject) {
        console.log("review for" + FootwearID);
        addReview(FootwearID, recommendation_description, review, rating).then(function (bool) {
            if (bool) {
                resolve('review registered succesfully');
            }
        }).catch((err) => setImmediate(() => { console.log(err); reject(err); }));
    })
}

module.exports.deleteUser = function (username) {
    return new Promise(function (resolve, reject) {
        console.log("Deleting user with ID: " + username);
        removeUser(username).then(function (bool) {
            if (bool) {
                resolve('User deleted successfully');
            } else {
                reject('Failed to delete user');
            }
        }).catch((err) => setImmediate(() => { console.log(err); reject(err); }));
    });
}
