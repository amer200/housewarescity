const CategAr = require("../models/category-ar");
const Team = require("../models/team");
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
  if (!nameAr || !nameEn || !img) {
    const msg = "all fileds is required !";
    req.session.errMsg = msg;
    res.redirect("/admin");
  } else {
    const newCateg = new CategAr({
      name: {
        ar: nameAr,
        en: nameEn,
      },
      img: img[0] ? img[0].path : "",
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
  }
};
exports.editCateg = (req, res, next) => {
  const nameAr = req.body.name_ar;
  const nameEn = req.body.name_en;
  if (!nameAr || !nameEn) {
    const msg = "all fileds is required !";
    req.session.errMsg = msg;
    return res.redirect("/admin");
  }
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
      res.render("admin/product-by-categ", {
        prods: c.prods,
        categ: categ,
        categName: c.name.ar,
      });
    })
    .catch((err) => {
      console.log(err);
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
  const itemno = req.body.item_no;
  const dimentions = {
    w: req.body.w,
    h: req.body.h,
    l: req.body.l,
    pcs_ctn: req.body.pcs_ctn,
    weight: req.body.weight,
    cbm: req.body.cbm,
    pcs_20ft: req.body.pcs_20ft,
    pc_40ft: req.body.pc_40ft,
  };
  if (!price || !quant) {
    const msg = "السعر و الكمية يجب اضفتهم";
    req.session.errMsg = msg;
    return res.redirect(`/admin/prods/${categId}`);
  }
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
    itemno: itemno,
    dimentions: dimentions,
  };
  CategAr.findById(categId)
    .then((c) => {
      c.prods.push(prod);
      return c.save();
    })
    .then((result) => {
      res.redirect(`/admin/prods/${categId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.editProd = (req, res, next) => {
  const nameAr = req.body.name_ar;
  const nameEn = req.body.name_en;
  const descAr = req.body.desc_ar;
  const descEn = req.body.desc_en;
  const offer = req.body.offer;
  const categId = req.params.categId;
  const prodId = req.params.prodId;
  const price = req.body.price;
  const quant = req.body.quant;
  const imgs = req.files;
  const itemno = req.body.item_no;
  const dimentions = {
    w: req.body.w,
    h: req.body.h,
    l: req.body.l,
    pcs_ctn: req.body.pcs_ctn,
    weight: req.body.weight,
    cbm: req.body.cbm,
    pcs_20ft: req.body.pcs_20ft,
    pc_40ft: req.body.pc_40ft,
  };
  const imgsPath = [];
  if (!price || !quant) {
    const msg = "السعر و الكمية يجب اضفتهم";
    req.session.errMsg = msg;
    return res.redirect(`/admin/prods/${categId}`);
  }
  if (imgs) {
    imgs.forEach((i) => {
      imgsPath.push(i.path);
    });
  }
  CategAr.findById(categId)
    .then((c) => {
      const oldProd = c.prods.id(prodId);
      oldProd.name.ar = nameAr;
      oldProd.name.en = nameEn;
      oldProd.desc.ar = descAr;
      oldProd.desc.en = descEn;
      oldProd.offer = offer;
      oldProd.price = price;
      oldProd.quant = quant;
      oldProd.itemno = itemno;
      oldProd.dimentions = dimentions;
      if (imgs) {
        oldProd.imgs.push(...imgsPath);
      }
      return c.save();
    })
    .then((result) => {
      res.redirect(`/admin/prods/${categId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.searchProd = (req, res, next) => {
  const categ = req.params.categId;
  const prod = req.body.prod;
  CategAr.findById(categ)
    .then((c) => {
      c.prods.forEach((p) => {
        if (p.itemno == prod) {
          let foundprod = p;
          return res.render("admin/edit-prod", {
            p: foundprod,
            categ: categ,
          });
        } else {
          const msg = "لا يوجد منتج بهذا الرقم";
          req.session.errMsg = msg;
          return res.redirect(`/admin/prods/${categ}`);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.removeProdImg = (req, res, next) => {
  const categ = req.params.categId;
  const prod = req.params.prodId;
  const imgPath = req.params.imgPath;
  CategAr.findById(categ)
    .then((c) => {
      const p = c.prods.id(prod);
      let pImgs = p.imgs.filter((i) => {
        return i !== `admin-uploads/${imgPath}`;
      });
      fs.unlink(`admin-uploads/${imgPath}`, () => {});
      p.imgs = pImgs;
      return c.save();
    })
    .then((resu) => {
      res.redirect(`/admin/prods/${categ}`);
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
      const imgsPath = c.prods.id(prodId).imgs;
      imgsPath.forEach((i) => {
        fs.unlink(i, () => {});
      });
      c.prods.id(prodId).remove();
      return c.save();
    })
    .then((result) => {
      res.redirect(`/admin/prods/${categId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getTeam = (req, res, next) => {
  Team.find()
    .then((t) => {
      res.render("admin/team", {
        team: t,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.addTeam = (req, res, next) => {
  const name = req.body.name;
  const facebook = req.body.facebook;
  const twitter = req.body.twitter;
  const insta = req.body.instagram;
  const img = req.files[0].path;
  const job = req.body.job;

  const team = new Team({
    name: name,
    facebook: facebook,
    twitter: twitter,
    insta: insta,
    img: img,
  });
  team
    .save()
    .then((resu) => {
      res.redirect("/admin/team");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.removeTeam = (req, res, nex) => {
  const id = req.params.id;
  Team.findByIdAndDelete(id)
    .then((resu) => {
      res.redirect("/admin/team");
    })
    .catch((err) => {
      console.log(err);
    });
};
