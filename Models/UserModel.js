var db = require('mongoose');
var UserSchema = db.Schema({
    usrname: {
        required: true,
        type: String
    },
    pwrd: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = db.model('UserSchema', UserSchema);