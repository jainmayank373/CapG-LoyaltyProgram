const transHistory = require('../models/transactionHistory');
const express = require('express');
const transRoute = express.Router();
const bodyParser =  require('body-parser');
const auth = require('../authenticate');
const users = require('../models/users');

transRoute.use(bodyParser.json());
transRoute.route('/')
.get(auth.verifyUSer,(req,res,next)=>{

    users.findById(req.user._id)
    .populate('transactionHistory')
    .then((user)=>{
        console.log(user);
        res.json(user.transactionHistory);


    })

});


module.exports= transRoute;