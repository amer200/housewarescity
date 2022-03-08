const user = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const ejs = require("ejs");

async function sendEmail(email, link) {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "qwllnwmw7cvoudcz@ethereal.email",
      pass: "RMcQ8KVQvJtBQ1BzYQ",
    },
  });
  const data = await ejs.renderFile(__dirname + "/email.ejs", {
    link: link,
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "home@test.com", // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: data, // html body
  });
  return nodemailer.getTestMessageUrl(info);
}
exports.signUp = (req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const role = "basic";
  if (!name || !username || !password || !email) {
    res.render("main/signup", {
      message: "all fields is required",
    });
  }
  user
    .findOne({ email: email })
    .then((u) => {
      if (u) {
        res.render("main/signup", {
          message: "this email is used maybe you shold login",
        });
      } else {
        const hash = bcrypt.hashSync(password, saltRounds);
        const code = Math.floor(Math.random() * 10000);
        const hashedCode = bcrypt.hashSync(code.toString(), 10);
        console.log(hashedCode);
        const newUser = new user({
          name: name,
          username: username,
          password: hash,
          email: email,
          role: role,
          isactive: false,
          code: hashedCode,
        });
        return newUser.save();
      }
    })
    .then((u) => {
      console.log(u);
      const link = `http://localhost:8080/user/confirm/email/${u.code}`;
      return sendEmail(u.email, link);
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.emailConfirm = (req, res, next) => {
  const code = req.params.code;
  user
    .findOne({ code: code })
    .then((u) => {
      if (u) {
        u.isactive = true;
        u.code = "";
        u.save().then((result) => {
          res.send("your account is active now");
        });
      } else res.send("no user found");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.signIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.render("main/login", {
      message: "all fields is required",
    });
  }
  user
    .findOne({ email: email })
    .then((u) => {
      if (u) {
        bcrypt.compare(password, u.password, function (err, result) {
          if (result) {
            req.session.user = u;
            if (u.role == "admin") {
              res.redirect("/admin");
            } else {
              res.redirect("/");
            }
          } else {
            res.render("main/login", {
              message: "wrong password",
            });
          }
        });
      } else {
        res.render("main/login", {
          message: "no user with this email",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getSignUp = (req, res, next) => {
  res.render("main/signup.ejs", {
    message: false,
  });
};
exports.getSignIn = (req, res, next) => {
  res.render("main/login", {
    message: false,
  });
};
