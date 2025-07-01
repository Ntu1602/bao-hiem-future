const member = require("../model/memberModel");
const Account = require("../model/accountModel");
const Page = require("../model/pageModel");
class loginController {
  checkLogin(req, res, next) {
    const { account, password } = req.body;
    Account
      .findOne({ username: account, password })
      .then((member) => {
        if (member) {
          req.session.user = {
            id: member._id,
            account: member.account,
            name: member.name,
            image: member.image,
          };
          res.redirect("/admin");
        } else {
          res.redirect("/admin");
        }
      })
      .catch((err) => {
        next();
      });
  }
  show(req, res, next) {
    Page.findOne({name:"Future"}).lean()
    .then(pageinfo => {
      res.render("admin/dashboard", {
        layout: "dashboard",
        user: req.session.user,
        pageinfo
      });
    })
  }
  checkLogout(req, res) {
    if (req.query.logout === "1") {
      req.session.destroy((err) => {
        if (err) console.error(err);
        res.redirect("/admin"); // logout xong quay lại trang login
      });
    } else {
      res.render("admin/login", { layout: "login" }); // hiển thị form login
    }
  }
}

module.exports = new loginController();
