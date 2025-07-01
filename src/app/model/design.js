const mongoose = require('mongoose');
const {Schema} = mongoose;

const Design = new Schema({
    name:String,
    image:String,
    content:String
});
module.exports = mongoose.model("Design",Design,"Designs");