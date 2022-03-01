const CategAr = require("../models/category-ar");

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
exports.getProds = (req, res, next) => {
  CategAr.find()
    .then((cs) => {
      let prods = [];
      cs.forEach((c) => {
        c.prods.forEach((p) => {
          prods.push(p);
        });
      });
      res.send(prods);
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
