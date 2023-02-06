const Cryptr = require('cryptr');
// const { use } = require('../Routes/routes');
const emailValidator = require('email-Validator')

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

exports.Dao_add = function(req,callback)
{
    var cryptr = new Cryptr('Guru');
    var enc = cryptr.encrypt(req.body.password);
    var dec = cryptr.decrypt(enc);

    var user = new user_Signup();
    user.firstName = req.body.firstName;
    user.lastName  = req.body.lastName;
    user.userName  = req.body.userName;
    user.email     = req.body.email;
    user.mobile    = req.body.mobile;
    user.password  = enc;

    user.save(function (err) {
        if(err)
            callback.json(err);

         callback.json({
            message : "*** New user signup ***",
            data: {
                firstName : req.body.firstName,
                lastName  : req.body.lastName,
                userName  : req.body.userName,
                email     : req.body.email,
                mobile    : req.body.mobile,
                password  : enc
            }
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
        user.firstName = req.body.firstName,
        user.lastName  = req.body.lastName,
        user.userName  = req.body.userName,
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
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title:'UserDetails',
            version:'1.0.0'
        }
    },
    apis : ['./Dao/Dao.js'],
    // apis : ['index.js','../Dao/Dao.js','../Config/MongoConfig','../Routes/routes.js','../Service/Service.js','Controller/Controller.js'],
};
const express = require('express')
app = express()
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = swaggerJsDoc(swaggerOptions);
// console.log(swaggerDocs);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /api:
 *   get:
 *      description: Get all Users
 *      responses:
 *      200:
 *          description: Success
 * 
 */