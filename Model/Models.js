var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    firstName : {
        required : false,
        type     : String
    },
    lastName : {
        required : false,
        type    : String
    },
    userName : {
        required : true,
        type    : String
    },
    email : {
        required : true,
        type    : String
    },
    mobile : {
        required : true,
        type    : Number
    },
    password : {
        required : true,
        type    : String
    },
    created_at : {
        type : Date,
        default : Date.now
    }
});

var user_Signup = module.exports = mongoose.model('User_1',Schema);
module.exports.get = function(callback, limit) {
    user_Signup.find(callback).limit(limit);
};