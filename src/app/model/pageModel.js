const mongoose = require('mongoose');
const {Schema} = mongoose;

const Page = new Schema(
    {   
        name: {type: String, default: "Future"},
        dailyView: {type: Number, default:0},
        weekView: {type: Number, default:0},
        view: {type: Number,default:0}
    }
)

module.exports = mongoose.model("Page",Page,"Pages");