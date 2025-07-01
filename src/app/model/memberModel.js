const mongoose = require('mongoose');
const { Schema } = mongoose;

const member = new Schema({
  name: {type: String, default: "none"},
  position: {type: String, default: "FC"},
  code: {type: String, default: "0"},
  email: { type: String, default: "hanwha@email.com" },
  phonenumber: {type: String, default: "none"},
  birthday: {type: Date},
  address: {type: String, default: "none"},
  image: {type: String, default: "/images/members/default-member.jpeg"},
  social_facebook: {type: String, default: "none"},
  social_zalo: {type: String, default: "none"},
  status: {type: String, default:""},
});

module.exports = mongoose.model('Member', member, 'members'); // đúng collection
