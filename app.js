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
const cors = require("cors");
const MongoStore = require("connect-mongo");
const CategAr = require("./models/category-ar");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "admin-uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: dbUrl }),
  errMsg: false,
  cookie: { lang: "ar" },
};
app.use((req, res, next) => {
  const lang = req.query.lang;
  console.log(lang);
  if (lang) {
    sessionConfig.cookie.lang = lang;
    res.locals.lang = sessionConfig.cookie.lang;
    res.redirect("/");
  } else {
    res.locals.lang = sessionConfig.cookie.lang;
    next();
  }
});
app.use(session(sessionConfig));
app.use((req, res, next) => {
  CategAr.find()
    .then((c) => {
      res.locals.user = req.session.user;
      res.locals.errMsg = req.session.errMsg;
      req.session.errMsg = false;
      res.locals.categs = c;
    })
    .then((resu) => {
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});
const upload = multer({ storage: storage });
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload.array("imgsUP"));
app.use(locale(supported, defaultLang));
app.use("/admin-uploads", express.static("admin-uploads"));
app.use("/", express.static("public"));
app.set("view engine", "ejs");

app.use(cors());
// routes
const adminRoutes = require("./routes/admin");
const mainRoutes = require("./routes/main");
const userRoutes = require("./routes/user");
const isAdmin = require("./controllers/isAdmin").isAdmin;
app.use("/admin", isAdmin, adminRoutes);
app.use("/user", userRoutes);
app.use("/", mainRoutes);
app.use((req, res) => {
  res.send("Not found !!");
});
mongoose
  .connect(dbUrl)
  .then((result) => {
    console.log(`db on ${dbUrl}`);
    app.listen(port, (err) => {
      console.log(`app conected port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
