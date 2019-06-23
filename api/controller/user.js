const mongoose = require('mongoose');
const usermodel = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.user_signup = (req, res, next) => {
    usermodel.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Username exists'
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }

                    else {
                        var userModel = new usermodel({
                            // _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            password: hash
                        });

                        console.log(usermodel);
                        userModel
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });

                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
}



exports.user_login = (req, res, next) => {
    usermodel.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        userId: user[0]._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }

                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        
                        
                    });                                                                                                                             
                }
                else {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
