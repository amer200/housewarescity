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

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload.array("imgsUP"));
app.use(locale(supported, defaultLang));
app.use("/admin-uploads", express.static("admin-uploads"));
app.use("/", express.static("public"));
app.set("view engine", "ejs");
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: dbUrl }),
  errMsg: false,
};
app.use(session(sessionConfig));
app.use((req, res, next) => {
  res.locals.lang = "ar";
  res.locals.user = req.session.user;
  res.locals.errMsg = req.session.errMsg;
  req.session.errMsg = false;
  CategAr.find()
    .then((c) => {
      res.locals.categs = c;
    })
    .catch((err) => {
      console.log(err);
    });
  next();
});

app.use(cors());
// routes
const adminRoutes = require("./routes/admin");
const mainRoutes = require("./routes/main");
const userRoutes = require("./routes/user");
const res = require("express/lib/response");
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
