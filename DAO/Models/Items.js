/**
 * Created by yanglizhuo on 16/12/26.
 */

var mongoose = require("mongoose");

module.exports = mongoose.model('items', new mongoose.Schema({
    seller:{
        type:mongoose.Schema.ObjectId,
        ref:'users'
    },
    price:{
        type:Number
    },
    itemname:{
        type:String
    },
    description:{
        type:String
    },
    img:{
        type:String
    },
    category:[{
        type:String
    }],
    sellerName:{
        type:String
    },
    totalNum:{
        type:Number
    },
    orderedNum:{
        type:Number
    }
}));