
const homeController = require("../app/controllers/homeController");
const eventController = require("../app/controllers/eventController");
const formController = require("../app/controllers/formController");
const loginController = require("../app/controllers/loginController");
const { isLoggedIn } = require("../app/midlewares/loginMidleware");
const {isViewedPage} = require('../app/midlewares/checkViewedMidleware');


const postRouter = require("./post")
const adminRouter = require("./admin");

function route(app) {
  app.get("/",isViewedPage, homeController.show);
  app.post("/form-recruitment", formController.formRecruitment);
  app.post("/form-advise", formController.formAdvise);
  app.post("/form-contact", formController.formContact);
  app.post("/event/form-event", formController.formEvent);
  app.post('/admin',loginController.checkLogin);
  app.use("/admin", isLoggedIn, adminRouter);
  app.get("/event/:slug", eventController.show);

  app.use("/post",postRouter)
}

module.exports = route;
