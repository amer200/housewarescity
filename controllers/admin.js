const CategAr = require("../models/category-ar");
const fs = require("fs");
exports.getIndex = (req, res, next) => {
  CategAr.find()
    .then((c) => {
      res.render("admin/admin", {
        categs: c,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addCateg = (req, res, next) => {
  const nameAr = req.body.name_ar;
  const nameEn = req.body.name_en;
  const img = req.files;
  const newCateg = new CategAr({
    name: {
      ar: nameAr,
      en: nameEn,
    },
    img: img[0].path,
    prod: [],
  });
  newCateg
    .save()
    .then((c) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.editCateg = (req, res, next) => {
  const nameAr = req.body.name_ar;
  const nameEn = req.body.name_en;
  let img = req.body.img;
  const categId = req.params.categId;
  if (req.files[0]) {
    img = req.files[0].path;
    fs.unlink(req.body.img, () => {});
  }
  CategAr.findById(categId)
    .then((c) => {
      const name = {
        ar: nameAr,
        en: nameEn,
      };
      c.name = name;
      c.img = img;
      return c.save();
    })
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.removeCateg = (req, res, next) => {
  const categId = req.params.categId;
  CategAr.findByIdAndDelete(categId)
    .then((result) => {
      fs.unlink(result.img, () => {});
      result.prods.forEach((p) => {
        p.imgs.forEach((i) => {
          fs.unlink(i, () => {});
        });
      });
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getCategProd = (req, res, next) => {
  const categ = req.params.categId;
  CategAr.findById(categ)
    .then((c) => {
      console.log(c.prods)
      res.render("admin/product-by-categ", {
        prods: c.prods,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getAddProd = (req, res, next) => {
  const categId = req.params.categId;
  res.render("admin/add-product", {
    categ: categId,
  });
};
exports.addProd = (req, res, next) => {
  const nameAr = req.body.name_ar;
  const nameEn = req.body.name_en;
  const descAr = req.body.desc_ar;
  const descEn = req.body.desc_en;
  const offer = req.body.offer;
  const categId = req.params.categId;
  const price = req.body.price;
  const quant = req.body.quant;
  const imgs = req.files;
  const imgsPath = [];
  if (imgs) {
    imgs.forEach((i) => {
      imgsPath.push(i.path);
    });
  }
  const prod = {
    name: {
      ar: nameAr,
      en: nameEn,
    },
    desc: {
      ar: descAr,
      en: descEn,
    },
    price: price,
    quant: quant,
    imgs: imgsPath,
    offer: offer,
  };
  CategAr.findById(categId)
    .then((c) => {
      c.prods.push(prod);
      return c.save();
    })
    .then((result) => {
      res.redirect("/admin");
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
