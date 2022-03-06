const { name } = require("ejs");
const CategAr = require("../models/category-ar");

exports.getIndex = (req, res, next) => {
  const lang = req.params.lang;
  let isOffers;
  let categName = [];
  let firstProdCateg = [];
  let randomProdCateg = [];
  CategAr.find()
    .then((c) => {
      c.forEach((c) => {
        isOffers = c.prods.filter((p) => {
          return p.offer > 0;
        });
        categName.push({ name: c.name, img: c.img });
        firstProdCateg.push(c.prods[0]);
        randomProdCateg.push(
          c.prods[Math.floor(Math.random() * c.prods.length)]
        );
      });
      console.log(randomProdCateg);
      res.render("main/index", {
        offers: isOffers,
        categName: categName,
        firstProdCateg: firstProdCateg,
        randomProd: randomProdCateg,
        lang: lang,
      });
    })
    .catch((err) => {
      console.log(err);
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

exports.getProd = (req, res, next) => {
  const prodId = req.params.prodId;
  CategAr.find()
    .then((cs) => {
      cs.forEach((c) => {
        c.prods.forEach((p) => {
          if (p._id.toString() == prodId) {
            res.send(p);
          }
        });
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
