const CategAr = require("../models/category-ar");

exports.addCateg = (req, res, next) => {
  const name = req.body.name;
  const newCateg = new CategAr({
    name: name,
    prod: [],
  });
  newCateg
    .save()
    .then((c) => {
      res.send(c);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.editCateg = (req, res, next) => {
  const name = req.body.name;
  const categId = req.params.categId;
  CategAr.findById(categId)
    .then((c) => {
      c.name = name;
      return c.save();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.removeCateg = (req, res, next) => {
  const categId = req.params.categId;
  CategAr.findByIdAndDelete(categId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.addProd = (req, res, next) => {
  const name = req.body.name;
  const categ = req.body.categ;
  const price = req.body.price;
  const quant = req.body.quant;
  const imgs = req.files;
  if (imgs) {
    const imgsPath = [];
    imgs.forEach((i) => {
      imgsPath.push(i.path);
    });
  }
  const prod = {
    name: name,
    price: price,
    quant: quant,
    //imgs: imgsPath,
  };
  console.log(prod);
  CategAr.findOne({ name: categ })
    .then((c) => {
      c.prods.push(prod);
      return c.save();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.editProd = (req, res, next) => {
  const prodId = req.params.prodId;
  const name = req.body.name;
  const categ = req.body.categ;
  const price = req.body.price;
  const quant = req.body.quant;
  const imgs = req.files;
  const imgsPath = [];
  //   imgs.forEach((i) => {
  //     imgsPath.push(i.path);
  //   });
  CategAr.findOne({ name: categ })
    .then((c) => {
      const oldProd = c.prods.id(prodId);
      oldProd.name = name;
      oldProd.price = price;
      oldProd.quant = quant;
      return c.save();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.removeProd = (req, res, next) => {
  const prodId = req.params.prodId;
  const categ = req.body.categ;
  CategAr.findOne({ name: categ })
    .then((c) => {
      console.log(c.prods.id(prodId));
      c.prods.id(prodId).remove();
      return c.save();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
