require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ejs = require("ejs");
const session = require("express-session");
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;

app.use(express.urlencoded({ extended: true }));
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
// routes
const adminRoutes = require("./routes/admin");
const mainRoutes = require("./routes/main");
const userRoutes = require("./routes/user");
const isAdmin = require("./controllers/isAdmin").isAdmin;
app.use("/admin/:lang", isAdmin, adminRoutes);
app.use("/user/:lang", userRoutes);
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
