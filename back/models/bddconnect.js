var mongoose = require('mongoose');

var user = 'harry';
var password = 'azerty12';
var port = 47926;
var bddname = 'ledecideur';

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
