const mongoose = require('mongoose');
const { Schema } = mongoose;

const post = new Schema({
    title: {type:String},
    content: {type:String},
    subContent:{type:String},
    createAt: {type:Date, default: () => new Date(Date.now() + 7 * 60 * 60 * 1000)},
    author: {type:String},
    image:{type:String},
    category:{type:String},
    view:{type: Number, default: 0},
    slug:{type:String},
    status:{type:String,default:""}
});

module.exports = mongoose.model('Post', post, 'Posts'); // đúng collection
