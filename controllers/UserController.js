var db = require('mongoose');
var User = require('../Models/UserModel');
var util = require('../utility/utility');
var Checklist = require('../Models/ChecklistModel');
var JWT = require('jwt-simple');
var config = require('../config');

exports.login = function (req, res) {
    var query = req.body;
//    console.log(query)
    var validator = true;
    validator = !validator ? false : !util.isEmpty(query.user);
    validator = !validator ? false : !util.isEmpty(query.psw);
    console.log(validator);
    if (validator) {
        User.findOne({
            usrname: new RegExp('^' + query.user + '$', 'i')
        }, function (err, user) {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                if (user) {
                    util.compareHash(user.pwrd, query.psw).then(function (bool) {
                        if (bool) {
                            var token = JWT.encode({userid:user._id, exp: Math.round(Date.now() / 1000 + 3 * 24 * 60 * 60)},config.jwt_secret);
                            res.send({token:token});
                        } else {
                            res.status(400).send({
                                message: "Username Password wrong"
                            });
                        }
                    }).catch(function (err) {
                        console.log(err);
                        res.sendStatus(500);
                    })
                } else {
                    res.status(400).send({
                        message: "User does not exist"
                    });
                }
            }
        });
    } else {
        res.status(401).send({
            message: "Invalid Parameters"
        });
    }
}
exports.register = function (req, res) {
    var query = req.body;
    var validator = true;
    validator = !validator ? false : !util.isEmpty(query.user) && query.user.length >= 5;
    validator = !validator ? false : !util.isEmpty(query.psw);
    validator = !validator ? false : !util.isEmpty(query.email) && util.isValidEmail(query.email);
    if (validator) {
        User.findOne({
            usrname: new RegExp('^' + query.user + '$', 'i')
        }, function (err, user) {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                
                if (!user) {
                    util.hashPass(query.psw, 10).then(function (hash) {
                        var newUser = new User({
                            usrname: query.user,
                            pwrd: hash,
                            email: query.email
                        });
                        newUser.save(function (err) {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                            } else {
                                res.status(200).send({
                                    message: "User Saved"
                                });
                            }
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.sendStatus(500);
                    });
                } else {
                    res.status(403).send({
                        message: "User Exists"
                    });
                }
            }
        })
    } else {
        res.status(401).send({
            message: "Invalid Parameters"
        });
    }
}
exports.getchecklist = function (req, res) {
    var query = req.query;
    console.log(query);
    var validator = true;
    if (validator) {
        Checklist.find({}, {
            _id: 0,
            __v: 0,
            updated_at: 0,
            created_at: 0
        }, function (err, list) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.send(list);
            }
        })
    } else {
        res.status(401).send({
            message: "Invalid Parameters"
        });
    }
}
exports.createChecklistEntry = function (req, res) {
    var query = req.body;
    var validator = true;
    validator = !validator ? false : !util.isEmpty(query.requirement);
    if (validator) {
        var cl_entry = new Checklist({
            requirement: query.requirement,
            //status: query.status,
            contact_p: query.contact_p
        })
        cl_entry.save(function (err) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        })
    } else {
        res.status(401).send({
            message: "Invalid Parameters"
        });
    }
}