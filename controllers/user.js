const user = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const ejs = require("ejs");

async function sendEmail(email) {
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
    link: "Stranger",
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
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;
  const email = req.body.email;
  const role = "basic";
  user
    .findOne({ email: email })
    .then((u) => {
      if (u) {
        res.send("this email is used!!");
      } else {
        const hash = bcrypt.hashSync(password, saltRounds);
        console.log(hash);
        const newUser = new user({
          firstname: firstname,
          lastname: lastname,
          password: hash,
          email: email,
          role: role,
          isactive: false,
          code: Math.floor(Math.random() * 100000),
        });
        return newUser.save();
      }
    })
    .then((u) => {
      console.log(u);
      return sendEmail(u.email);
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
