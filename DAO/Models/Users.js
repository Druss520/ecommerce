/**
 * Created by yanglizhuo on 16/12/20.
 */

var mongoose = require("mongoose");

module.exports = mongoose.model('users',new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String
    },
    address:{
        address1:{
            type:String
        },
        address2:{
            type:String
        },
        city:{
            type:String
        },
        zipCode:{
            type:String
        }
    },
    phoneNumber:{
        type:String
    },
    email:{
        type:String
    }
}));