/**
 * Created by yanglizhuo on 16/12/26.
 */

var mongoose = require("mongoose");

module.exports = mongoose.model('orders', new mongoose.Schema({
    buyer:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    },
    quantity:{
        type:Number
    },
    item:{
        type:mongoose.Schema.ObjectId,
        ref:"items"
    },
    paymentStatus:{
        type:Boolean
    }
}));