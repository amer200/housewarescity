require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ejs = require("ejs");
const session = require("express-session");
const locale = require("locale");
const bodyParser = require("body-parser");
const defaultLang = "en";
const supported = ["ar", "en"];
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "admin-uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload.array("imgsUP"));
app.use(locale(supported, defaultLang));
app.use("/admin-uploads", express.static("admin-uploads"));
app.use("/", express.static("public"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use((req, res, next) => {
  if (!res.locals.lang) {
    res.locals.lang = "ar";
  }
  res.locals.user = req.session.user;
  next();
});
// routes
const adminRoutes = require("./routes/admin");
const mainRoutes = require("./routes/main");
const userRoutes = require("./routes/user");
const isAdmin = require("./controllers/isAdmin").isAdmin;
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/", mainRoutes);

mongoose
  .connect(dbUrl)
  .then((result) => {
    console.log(`db on ${dbUrl}`);
    app.listen(port, (err) => {
      console.log(`app conected on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
