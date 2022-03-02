exports.isAdmin = (req, res, next) => {
  //   if (req.session.Auth) {
  //     if (req.session.Auth.role == "admin") {
  //       return next();
  //     } else {
  //       res.status(403).send("you are not allowed to do this !!!");
  //     }
  //   } else {
  //     res.status(403).send("you are not allowed to do this !!!");
  //   }
  next();
};
