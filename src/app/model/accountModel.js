const mongoose = require('mongoose');
const {Schema} = mongoose;

const Account = new Schema({
    username: String,
    password: String,
    image: String,
    name: String
})

module.exports = mongoose.model("Account", Account, "Accounts");