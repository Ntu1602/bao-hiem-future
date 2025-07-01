const express = require("express");
const app = express();
const handlebar = require("express-handlebars");
const resetView = require('../src/app/utils/resetView')
const path = require("path");
const route = require("./route/");
const mongoose = require("mongoose");
const db = require("./config/db");
const session = require("express-session");

//Cho phép lấy dữ liệu từ form POST
app.use(express.urlencoded({ extended: true }));
//cấu hính session
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

//Helpers handlebar
const hbs = handlebar.create({
  extname: ".hbs",
  helpers: {
    getDay: (date) => {
      if (!(date instanceof Date)) date = new Date(date);
      return ("0" + date.getDate()).slice(-2);
    },
    getMonth: (date) => {
      if (!(date instanceof Date)) date = new Date(date);
      return ("0" + (date.getMonth() + 1)).slice(-2); // Vì tháng bắt đầu từ 0
    },
    getYear: (date) => {
      if (!(date instanceof Date)) date = new Date(date);
      return date.getFullYear();
    },
    getDate: (date) => {
      if (!(date instanceof Date)) date = new Date(date);
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day} - ${month} - ${year}`;
    },
    getTime: (date) => {
    if(!(date instanceof Date)) date = new Date(date);
    const hours = ("0" + date.getUTCHours()).slice(-2);
    const minutes = ("0" + date.getUTCMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  },
    inc: function (value) {
      return parseInt(value) + 1;
    },
  },
});
//Connect to DB Mongoose
db.connect();


//Static file
app.use(express.static(path.join(__dirname, "public")));

//reset View
resetView();

//Handlebar Engine
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));


const Company = require("../src/app/model/companyModel");

app.use(async (req, res, next) => {
  try {
    const company = await Company.findOne().lean(); // hoặc findById(...) nếu cần
    res.locals.company = company;
    next();
  } catch (err) {
    next(err);
  }
});

route(app);

app.listen(3000, console.log("Connection succesfully at port 3000!"));
