const mongoose =  require('mongoose');
const Schema =  mongoose.Schema;
const products =  require('./products');
const transactionHistorySchema =  new Schema({
        product:{
        type:mongoose.Schema.Types.ObjectId,
       ref:'product'
     },
    
});
const transactionHistory = mongoose.model('transactionHistory',transactionHistorySchema);
module.exports = transactionHistory;