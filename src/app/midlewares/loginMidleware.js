function isLoggedIn(req, res, next) {
  if (req.session.user) {
    next(); // đã đăng nhập => cho qua
  } else {
    res.render('admin/login',{layout:'login'}); // chưa đăng nhập => chuyển sang trang login
  }
}

module.exports = {isLoggedIn};