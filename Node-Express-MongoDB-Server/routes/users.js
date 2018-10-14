var express = require('express');
var router = express.Router();
const bodyparser = require('body-parser');
const users =  require('../models/users');
const passport = require('passport');
const passportLocal =  require('../passportLocal');
const authenticate = require('../authenticate');
router.use(bodyparser.json());

router.post('/login',passport.authenticate('local'),(req,res,next)=>{
    var token =authenticate.getToken({_id:req.user._id});
    req.statusCode = 200;
    res.json({token:token,success:true});
})


router.post('/signup',(req,res,next)=>{
console.log("signup",req.body);
            users.findOne({userId:req.body.username})
            .then((user)=>{
                    if(user)
                        {
                            var err = new Error("username already exist");
                            
                            next(err);
                        }
                        
                        else{
                            
                          var  User= new users();
                                User.userId= req.body.username;
                                User.loyaltycardnumber = req.body.username;
                                User.password = User.hashPassword(req.body.password);
                                User.save().then((user)=>{
                                    console.log("user Created");
                                })
                        res.statusCode=200;
                        res.setHeader('content-type','application/json');
                        res.json({success:true,message:"user created"});
                            }

                        
            })
            .catch(err=>next(err));
                    
})    

//CRUD operations on all USERS



module.exports = router;
