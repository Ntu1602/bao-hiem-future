const mongoose = require('mongoose');
const { Schema } = mongoose;

const Event = new Schema({
  title: String,
  content: String,
  location: String,
  status: { type: String, enum: ['upcoming', 'ended'] },
  slug: String,
  startAt: Date, // chứa cả ngày và giờ
  ticket: String,
  image: String,
  thumbnail: String,
});

module.exports = mongoose.model('Event', Event, 'events'); // đúng collection