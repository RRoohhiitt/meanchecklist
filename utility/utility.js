var bcrypt = require('bcrypt');
exports.isEmpty = function (str) {
    if (typeof str == "undefined" || str === null || typeof str == 'string' && !str.trim()) {
        return true;
    } else {
        return false;
    }
}
exports.isValidEmail = function (em) {
    var emRegx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return emRegx.test(em)
}
exports.hashPass = function (psw, rounds) {
    return bcrypt.hash(psw, rounds);
}
exports.compareHash = function (hash, psw) {
    return bcrypt.compare(psw, hash);
}
exports.signToken = function () {
    
}