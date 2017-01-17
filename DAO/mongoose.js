/**
 * Created by yanglizhuo on 16/12/20.
 */

var config = require("config-lite");
var mongoose = require("mongoose");

module.exports=function () {

    var db = mongoose.connect(config.dbpath);

    db.connection.on('connected',function () {
        console.log("mongodb connected !")
    });

    db.connection.on('error',function (err) {
        console.log("error is " + err);
    });


    return db;
};