/**
 * Created by yanglizhuo on 16/12/26.
 */
var mongoose = require("mongoose");

module.exports = mongoose.model('cart', new mongoose.Schema({
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:'users'
    },
    orders:[{
        itemId:{
            type:mongoose.Schema.ObjectId,
            ref:'orders'
        }
    }]
}));