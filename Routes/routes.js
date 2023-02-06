let router = require('express').Router();
const Cryptr = require('cryptr');
var cryptr = new Cryptr("Guru")


router.get('/',function(req,res){
    res.json({
        status : 'API Works',
        message : 'Welcome to User Signin/Signup API'
    });
});

const user_Signup = require('../Model/Models');

router.post('/signin',(req,res) => {
    user_Signup.findOne({ email : req.body.email }, function(err,user){
      
        if (user === null) {
            return res.status(400).send({
                message : "The given User cannot be found."
            })
        }
        else {
            var cryptr = new Cryptr('Guru');
            var enc = cryptr.encrypt(req.body.password);
            var dec = cryptr.decrypt(enc);
            if (req.body.password === dec) {
                return res.status(201).send({
                    message : "Signin Successfully",
                    data: {
                        userName  : req.body.userName,
                        email     : req.body.email,
                        mobile    : req.body.mobile,
                        password  : enc
                    }
                    
                })
            }
            else {
                return res.status(400).send({
                    message : "Password incorrect"
                });
            }
        }
    })
    
    })


var Controller = require('../Controller/Controller.js');

router.route('/users')
.get(Controller.index)

router.route('/signup')
      .post(Controller.add);

router.route('/users/:email')
.get(Controller.view)
.patch(Controller.update)
.put(Controller.update)
.delete(Controller.Delete);

module.exports = router;
