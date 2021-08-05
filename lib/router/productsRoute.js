import express from "express";
import fs from "fs";
import path from "path";
import productModel from "../model/productsModel";

const Router = express.Router();

const allowedFiles = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"];

const errHandler = (err, res) => {
  if (err) return res.json({ status: false, message: `error ${err}` });
};

Router.post("/add", async (req, res) => {
  if (!req.files || !req.files.file)
    return res.json({ status: false, message: "no file selected" });
  if (!allowedFiles.includes(req.files.file.mimetype)) {
    return res.json({ status: false, message: "Invalid file selected" });
  }
  const body = req.body;
  const file = req.files.file;

  let element;
  for (element in body) {
    if (body[element] === "")
      return res.json({ status: false, message: "Required field(s) missing" });
  }
  return console.log(body, file);
  const createDir = `./public/uploads/${req.body.category}`;

  if (!fs.existsSync(createDir)) {
    fs.mkdir(createDir, (err) => {
      if (err)
        return res.json({
          status: false,
          message: `Error on creating dir,(${req.body.code}) ${err} (${createDir})`,
        });
    });
  }

  const uploadPath = path.join(
    __dirname,
    `../../public/uploads/${req.body.category}/`,
    file.name
  );
  const resource = req.body;
  resource.imageUrl = `../../uploads/${req.body.category}/${file.name}`;
  resource.imagePath = uploadPath;

  productModel.getProductByNameAndCategory(resource, (err, product) => {
    if (err) return errHandler(err, res);
    if (product.length)
      return res.json({
        status: false,
        message: "Name and Category pair already exists",
      });
    productModel.getProductByImageUrl(resource, (err, productUrl) => {
      if (err) return errHandler(err, res);
      if (productUrl.length)
        return res.json({ status: false, message: "Image Url already exists" });
      file.mv(uploadPath, (err) => {
        if (err) return errHandler(err, res);
        productModel.addProduct(resource, (err, success) => {
          if (err) return errHandler(err, res);
          if (success) return res.json({ status: true, data: success });
        });
      });
    });
  });
});

Router.get("/", (req, res) => {
  productModel.getAllProducts((err, products) => {
    if (err) return errHandler(err, res);
    if (!products.length)
      return res.json({ status: false, message: "No products in DB" });
    return res.json({ status: true, data: products });
  });
});
Router.get("/product/:id", (req, res) => {
  console.log(req.params);
  productModel.getProductById(req.params, (err, products) => {
    if (err) return errHandler(err, res);
    console.log(products);
    if (!products)
      return res.json({ status: false, message: "No products in DB" });
    return res.json({ status: true, data: products });
  });
});

Router.post("/remove", async (req, res) => {
  const body = req.body;
  let element;
  for (element in body) {
    if (body[element] === "")
      return res.json({ status: false, message: "resource id missing" });
  }
  productModel.getProductById(body, (err, resource) => {
    if (err) return errHandler(err, res);
    const filePath = resource.imagePath;
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err)
          return res.json({
            status: false,
            message: "Server error, Try again",
            adMessage: "Unable to delete file url",
          });
        productModel.deleteById(resource, (err, done) => {
          if (err)
            return res.json({
              status: false,
              message: "Server error, Try again",
              adMessage: "Unable to delete product",
            });
          if (!done)
            return res.json({
              status: false,
              message: "Unable to delete product",
            });
          if (done)
            return res.json({
              status: true,
              message: "Product successfully deleted",
            });
        });
      });
    } else {
      productModel.findByIdAndDelete(resource, (err, done) => {
        if (err)
          return res.json({
            status: false,
            message: "Server error, Try again",
            adMessage: "Unable to delete product",
          });
        if (!done)
          return res.json({
            status: false,
            message: "Unable to delete product",
          });
        if (done)
          return res.json({
            status: true,
            message: "Product successfully deleted",
          });
      });
    }
  });
});

Router.post("/update", (req, res) => {
  if (req.files && req.files.file) {
    if (!allowedFiles.includes(req.files.file.mimetype)) {
      return res.json({ status: false, message: "Invalid file selected" });
    }
    const file = req.files.file;

    const uploadPath = path.join(
      __dirname,
      `../../public/uploads/${req.body.category}/`,
      file.name
    );
    const resource = req.body;
    const filePath = resource.imagePath;
    // return console.log(filePath, resource, uploadPath)
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err)
          return res.json({
            status: false,
            message: "Server error, Try again",
            adMessage: "Unable to delete file url",
          });
      });
    }
    resource.imageUrl = `../../uploads/${req.body.category}/${file.name}`;
    resource.imagePath = uploadPath;
    file.mv(uploadPath, (err) => {
      if (err) return errHandler(err, res);
      productModel.updateProductById(resource, (err, success) => {
        if (err) return errHandler(err, res);
        if (success)
          return res.json({
            status: true,
            data: success,
            message: "product updated successfully",
          });
      });
    });
  } else {
    const resource = {};
    const body = req.body;
    let element;
    for (element in body) {
      if (body[element] !== "") {
        resource[element] = body[element];
      }
    }
    // console.log(resource,"here")
    productModel.updateProductById(resource, (err, success) => {
      console.log(err, success);
      if (err) return errHandler(err, res);
      if (success)
        return res.json({
          status: true,
          data: success,
          message: "product updated successfully",
        });
    });
  }
});

module.exports = Router;
