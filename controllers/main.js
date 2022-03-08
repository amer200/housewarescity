const CategAr = require("../models/category-ar");

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
exports.getProds = (req, res, next) => {
  const categ = req.params.categ;
  const lang = req.params.lang;
  if (categ == "all") {
    CategAr.find()
      .then((cs) => {
        let prods = [];
        cs.forEach((c) => {
          c.prods.forEach((p) => {
            prods.push(p);
          });
        });
        res.render("main/product", {
          categs: cs,
          prods: prods,
          lang: lang,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    CategAr.findById(categ)
      .then((c) => {
        res.render("main/product", {
          categs: false,
          prods: c.prods,
          lang: lang,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
exports.getProd = (req, res, next) => {
  const prodId = req.params.prodId;
  CategAr.find()
    .then((cs) => {
      cs.forEach((c) => {
        c.prods.forEach((p) => {
          if (p._id.toString() == prodId) {
            console.log(c.prods);
            res.render("main/product-details", {
              p: p,
              moreP: c.prods,
            });
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
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
