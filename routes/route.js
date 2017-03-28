var express = require('express');
var user_route = express.Router();
var UserController = require('../controllers/UserController');
var JWT = require('jwt-simple');
var config = require('../config');
var util = require('../utility/utility');
module.exports = function (app) {
    user_route.post('/api/v1/login', UserController.login);
    user_route.post('/api/v1/register', UserController.register);
    user_route.get('/api/v1/getchecklist', isAuthenticated, UserController.getchecklist);
    user_route.post('/api/v1/add_entry', isAuthenticated, UserController.createChecklistEntry);
    app.use('/', user_route);
}

function isAuthenticated(req, res, next) {
    var token = req.body.acc_token || req.query.acc_token || req.headers['x-access-token'];
    console.log(token);
    if (token) {
        var user = JWT.decode(token, config.jwt_secret);

        req.userid = user.userid;
        next();
    } else {
        res.status(401).send({
            message: "Invalid Parameters"
        });
    }
}