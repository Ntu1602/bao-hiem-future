const mongoose = require('mongoose');

function connect(){
  try{
    mongoose.connect('mongodb://127.0.0.1:27017/db_future');
    console.log("Connected DB is successfully");
  }catch(err){
    console.log("ERROR: " + err);
  }

}


module.exports = {connect}