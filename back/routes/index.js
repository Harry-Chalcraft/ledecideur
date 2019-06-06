var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
const request = require('request');
// We need to store the DB id once we sign in to target the right user later
var userIDDB;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({result: true});
});

router.post('/signup', function(req, res, next) {
    var salt = uid2(64);
    //The user's password needs to be hashed to protect his data
    UserModel.findOne({ email: req.body.email }, (error, data) => {
      if(data){
        res.json({result: false, isUserExist: true});
      } else {
        const newUser = new UserModel({
          email: req.body.email,
          salt : salt,
          password: SHA256(req.body.password + salt).toString(encBase64),
          token:uid2(64)
        });
        newUser.save(function(error, user) {
          res.json({result: true, isUserExist: false});
        });
      }
    }
  )


});

router.get('/signin', (req, res, next) => {
  UserModel.findOne({email: req.query.email}, (error, data) => {
    if (data){
      var hash = SHA256(req.query.password + data.salt).toString(encBase64);
      if (hash === data.password) {
        userIDDB= data._id
        res.json({result: true, isUserExist: true, data: data});
      } else {
        res.json({result: false, isUserExist: false});
      }
    } else {
      res.json({result: false, isUserExist: false});
    }
  });
});

router.get('/lists', function(req, res, next) {
  //We request all the choices of food and activities from the API
  request(`https://jsonblob.com/api/jsonBlob/3922298a-73d1-11e9-a51a-d788e3429df0`, function(error, response, body) {
    body = JSON.parse(body);
    res.json({body});
  });
});

router.post('/save', function(req, res, next) {
  //We need to target the right user with his id and save the result of the app along with the picture and teh timestamp
  UserModel.findOne({ _id: userIDDB},
  function(err, user) {
   if(user){
     user.decisions.push({result:req.body.result, url: req.body.url, date:req.body.date})
     user.save(function(err, user){
       res.json({result: true});
     });
   }
  });
});

router.get('/library', function(req, res, next) {
  // We collect every decision saved in the DB to display them in the library
  UserModel.findOne({ _id: userIDDB},
 function(err, user) {
   if(user){
      res.json({result: true, library: user.decisions});
      }
    }
  );
})

router.get('/delete', function(req, res, next) {
  UserModel.findOne({ _id: userIDDB},
 function(err, user) {
   if(user){
      user.decisions=[];
      user.save(function(err, user){
         res.json({result: true});
       });      }
    }
  );
})


module.exports = router;
