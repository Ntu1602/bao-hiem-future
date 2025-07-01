const mongoose = require('mongoose');
const {Schema} = mongoose

const Form = new Schema({
    name : {type: String},
    birthday : {type: Date},
    phone: {type: String},
    mail: {type: String},
    note: {type: String},
    formAtTime:{type: Date, default: Date.now},
    typeForm: {type: String}
})

module.exports = mongoose.model('Form',Form,'Forms');