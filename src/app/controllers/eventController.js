const eventDetail = require("../model/eventModel");
class eventController {
  show(req, res, next) {
    const slug = req.params.slug;
    eventDetail
      .findOne({ slug })
      .then((event) => {
        res.render("event-detail", { event: event.toObject() });
      })
      .catch((err) => {
        next();
      });
  }
}
module.exports = new eventController();
