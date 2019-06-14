var mongoose = require('mongoose');

var user = //dv username
var password = //db password
var port = //db port
var bddname = //db name

var options = { connectTimeoutMS: 5000, useNewUrlParser: true }

mongoose.connect(
  "mongodb://"+user+":"+password+"@ds1"+port+".mlab.com:"+port+"/"+bddname,
  options,
  function(error){
    if(!error){
      console.log("database ok");
    }else{
      console.log(error);
    }
  }
);
