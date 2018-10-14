const  monogoose  =  require('mongoose');
const schema = monogoose.Schema;
const products = require('./products');
const bcrypt = require('bcrypt-nodejs');
const transactionHistorySchema =  require('./transactionHistory').transactionHistorySchema;
const userSchema = new schema({

    userId:String,
    password:{
        type:String
    },
    loyaltycardnumber:String,
    shoppingcart:[
        {
            type:monogoose.Schema.Types.ObjectId,
            ref:'product'
        }
    ],
    pointBalance:{
        type:String
    },
    transactionHistory:[{
        type:monogoose.Schema.Types.ObjectId,
        ref:'product'
    }],

bonusPoint:[
 {   type:Number,
    default:0
 }
]
});

userSchema.methods.hashPassword = function(password){
            return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
userSchema.methods.validPassword = function(password){
    console.log("Hello",password,this);
            return   bcrypt.compareSync(password,this.password);
};

 const   user=  monogoose.model('user',userSchema);
 module.exports =user;