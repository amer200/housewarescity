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
  const sText = req.query.text;
  CategAr.find({ $text: { $search: sText } })
    .limit(10)
    .then((prod) => {
      if (prod) {
        res.send(prod);
      } else {
        res.send("no prod");
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
  CategAr.findById(categId).then((c) => {
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
  .catch(err =>{
    console.log(err)
  })
};
