const CategAr = require("../models/category-ar");
const Team = require("../models/team");
const User = require("../models/user");
exports.getIndex = (req, res, next) => {
  res.render("main/index");
};
exports.getAbout = (req, res, next) => {
  Team.find()
    .then((t) => {
      res.render("main/about", {
        team: t,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProds = (req, res, next) => {
  const categ = req.params.categ;
  let start = req.query.start;
  let end = req.query.end;
  if (!start) {
    start = 0;
    end = 10;
  }
  CategAr.findById(categ)
    .then((c) => {
      let prods = [];
      const pagNum = c.prods.length / 10;
      for (let i = start; i <= end; i++) {
        if (c.prods[i]) {
          prods.push(c.prods[i]);
        }
      }
      res.render("main/product", {
        categ: c,
        p: prods,
        pagNum: Math.floor(pagNum),
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
  const lang = req.session.cookie.lang;
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
      if (c[0]) {
        const prods = c[0].prods.filter((e) => {
          return (
            e.name.ar.match({ $regex: new RegExp("^" + text + ".*", "i") }) ||
            e.name.en.match({ $regex: new RegExp("^" + text + ".*", "i") })
          );
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
// exports.changeLang = (req, res, next) => {
//   const lang = req.params.lang;
//   req.session.cookie.lang = lang;
//   res.redirect("/");
// };
exports.getPrice = (req, res, next) => {
  const prods = req.body.prod;
  let total = 0;
  prods.forEach((p) => {
    total = total + p.price;
  });
  res.send({ total: total });
};
