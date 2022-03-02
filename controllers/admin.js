const CategAr = require("../models/category-ar");

exports.addCateg = (req, res, next) => {
  const nameAr = req.body.name_ar;
  const nameEn = req.body.name_en;
  const newCateg = new CategAr({
    name: {
      ar: nameAr,
      en: nameEn,
    },
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
  const nameAr = req.body.name_ar;
  const nameEn = req.body.name_en;
  const categId = req.params.categId;
  CategAr.findById(categId)
    .then((c) => {
      const name = {
        ar: nameAr,
        en: nameEn,
      };
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
  const nameAr = req.body.name_ar;
  const nameEn = req.body.name_en;
  const categId = req.params.categId;
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
    name: {
      ar: nameAr,
      en: nameEn,
    },
    price: price,
    quant: quant,
    //imgs: imgsPath,
  };
  console.log(prod);
  CategAr.findById(categId)
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
  const nameAr = req.body.name_ar;
  const nameEn = req.body.name_en;
  const categId = req.params.categId;
  const price = req.body.price;
  const quant = req.body.quant;
  const imgs = req.files;
  const imgsPath = [];
  //   imgs.forEach((i) => {
  //     imgsPath.push(i.path);
  //   });
  CategAr.findById(categId)
    .then((c) => {
      const oldProd = c.prods.id(prodId);
      oldProd.name.ar = nameAR;
      oldProd.name.en = nameEn;
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
  const categId = req.params.categId;
  CategAr.findById(categId)
    .then((c) => {
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
