const mongoose = require('mongoose');
const {Schema} = mongoose;

const Company = new Schema({
    name: {type: String},
    mail: {type: String},
    phone: {type: String},
    address: {type: String},
    mapLink : {type: String},
});

module.exports = mongoose.model('Company',Company,'Companys');