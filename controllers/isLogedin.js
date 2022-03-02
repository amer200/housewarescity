exports.isLoged = (req, res, next) => {
  if (req.session.Auth) {
    if (req.session.Auth.isactive == false) {
      res.send("plz active your account");
    } else {
      return next();
    }
  }
};
