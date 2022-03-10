exports.isAdmin = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role == "admin") {
      next();
    } else res.status(403).send("you are not allowed to do this !!");
  } else {
    res.redirect("/user/signin");
  }
};
