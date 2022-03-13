const CategAr = require("../models/category-ar");
const Team = require("../models/team");
const User = require("../models/user");
exports.getIndex = (req, res, next) => {
  CategAr.find().then((c) => {
    let offers = [];
    c.forEach((c) => {
      c.prods.forEach((p) => {
        if (p.offer) {
          offers.push(p);
        }
      });
    });
    res.render("main/index", {
      categs: c,
      offers: offers,
    });
  });
};
exports.getAbout = (req, res, next) => {
  CategAr.find()
    .then((c) => {
      Team.find().then((t) => {
        res.render("main/about", {
          categs: c,
          team: t,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProds = (req, res, next) => {
  const categ = req.params.categ;
  CategAr.findById(categ)
    .then((c) => {
      res.render("main/product", {
        categ: c,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProd = (req, res, next) => {
  const prodId = req.params.prodId;
  const categId = req.params.categId;
  CategAr.findById(categId)
    .then((c) => {
      res.render("main/product-details", {
        prod: c.prods.id(prodId),
      });
    })
    .catch((err) => {
      console.log(err);
    });
  exports.getCategs = (req, res, next) => {
    CategAr.find()
      .then((c) => {
        console.log(c);
        res.send(c);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
exports.getCateg = (req, res, next) => {
  const categId = req.params.categId;
  CategAr.findById(categId)
    .then((c) => {
      res.send(c);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getContact = (req, res, next) => {
  res.render("main/contact");
};
exports.getCard = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((u) => {
      res.render("main/card", {
        card: u.card,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.search = (req, res, next) => {
  const text = req.body.text.trim();
  console.log(text);
  const lang = req.session.lang;
  let filter;
  if (lang == "en") {
    filter = {
      "prods.name.en": { $regex: new RegExp("^" + text + ".*", "i") },
    };
  } else {
    filter = {
      "prods.name.ar": { $regex: new RegExp("^" + text + ".*", "i") },
    };
  }
  CategAr.find(filter)
    .then((c) => {
      // console.log(c);
      if (c[0]) {
        const prods = c[0].prods.filter((e) => {
          return e.name.ar.match(text) || e.name.en.match(text);
        });
        res.send({ p: prods, lang: lang });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.addCard = (req, res, next) => {
  const prodId = req.params.prodId;
  const categId = req.params.categId;
  const userId = req.params.userId;
  CategAr.findById(categId)
    .then((c) => {
      p = c.prods.id(prodId);
      User.findById(userId)
        .then((u) => {
          u.card.push(p);
          return u.save();
        })
        .then((result) => {
          res.redirect(`/card/${userId}`);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.changeLang = (req, res, next) => {
  const lang = req.params.lang;
  req.session.lang = lang;
  res.redirect("/");
};
