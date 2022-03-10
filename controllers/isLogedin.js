exports.isLoged = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/user/signin");
  }
};
