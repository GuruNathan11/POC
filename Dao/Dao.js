const Cryptr = require('cryptr');
// const { use } = require('../Routes/routes');

user_Signup = require('../Model/Models.js');

exports.Dao_index = function(req,callback)
{
    user_Signup.get(function (err,user){
        if (err)
            callback.json({
                status : "Error",
                message: err
            });
            callback.json({
                status : "Success",
                message: "Got user details Successfully",
                data   : user
            });
    });
};

exports.Dao_view = function (req,callback) 

{
    user_Signup.find({email:req.params.email}, function (err,user) 
    {
        if(err)
             callback.send(err)

             callback.json({
            message : "User Signup Details",
            data    : user
        }); 
    });    

    }

exports.Dao_update = function (req,callback) 
{
    user_Signup.find({email:req.params.useremail}, function (err,user)
    {
        var cryptr = new Cryptr('Guru');
    var enc = cryptr.encrypt(req.body.password);
    var dec = cryptr.decrypt(enc);
        if (err)
        callback.send(err);
        user.fName = req.body.fName,
        user.lName  = req.body.lName,
        user.userType  = req.body.userType,
        user.email     = req.body.email,
        user.mobile    = req.body.mobile,
        user.password  = enc;

        user.save(function (err) {
            if (err)
            callback.json(err)
            callback.json({
                message : "*** User details updated successfully ***",
                data    : user
            });
        });
    });
};

exports.Dao_Delete = function (req,callback)
{
    user_Signup.deleteOne({email:req.params.useremail}, function (err,user)
    {
        if (err)
        callback.send(err)
        callback.json({
            status : "Success",
            message: "*** User Deleted Successfully ***",
            data   : user
        });
    });
};
