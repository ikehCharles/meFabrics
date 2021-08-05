import express from "express";
import fs from "fs";
import path from "path";
import purchasesModel from "../model/purchasesModel";
import productModel from "../model/productsModel";

const Router = express.Router();

const errHandler = (err, res) => {
  if (err) return res.json({ status: false, message: `error ${err}` });
};

Router.post("/add", async (req, res) => {
  if (req.body.fabricId === undefined)
    return res.json({ status: false, message: "No fabric selected" });
  const body = req.body;
  let element;
  for (element in body) {
    if (body[element] === "")
      return res.json({ status: false, message: "Required field(s) missing" });
  }
  delete body["category"];
  console.log(body.fabricId);
  purchasesModel.getPurchaseByFabricId(body, (err, purchase) => {
    if (err) return errHandler(err, res);
    if (!purchase.length) {
      purchasesModel.addPurchase(body, (err, purchase) => {
        if (err) return errHandler(err, res);
        if (purchase) {
          productModel.getProductById(
            { _id: purchase.fabricId },
            (err, productArr) => {
              if (err) return errHandler(err, res);
              const product = productArr[0];
              if (product) {
                const updateProperty = {
                  yards: product.yards
                    ? parseFloat(product.yards) + parseFloat(body.yards)
                    : parseFloat(body.yards),
                  remains: product.remains
                    ? parseFloat(product.remains) + parseFloat(body.yards)
                    : parseFloat(body.yards),
                  sold: false,
                  purchaseId: purchase._id,
                };
                productModel.updateProductById(
                  { ...product, ...updateProperty },
                  (err, product) => {
                    if (err) return errHandler(err, res);
                    if (product) {
                      return res.json({
                        status: true,
                        message: "Product Updated Successfully",
                        data: product,
                      });
                    }
                  }
                );
              }
            }
          );
        }
      });
    } else {
      console.log(purchase[0]);
      productModel.getProductById(
        { _id: purchase[0].fabricId },
        (err, productArr) => {
          if (err) return errHandler(err, res);
          const product = productArr[0];
          if (product) {
            console.log(body, product, "here");
            console.log(parseInt(body.quarter) === product.purchase[0].quarter);
            if (product.purchase[0].quarter === parseInt(body.quarter))
              return res.json({
                status: false,
                message: "Purchase entry exist for that quarter",
              });
            const updateProperty = {
              yards: product.yards
                ? parseFloat(product.yards) + parseFloat(body.yards)
                : parseFloat(body.yards),
              remains: product.remains
                ? parseFloat(product.remains) + parseFloat(body.yards)
                : parseFloat(body.yards),
              sold: false,
              purchaseId: purchase[0]._id,
            };
            productModel.updateProductById(
              { ...product, ...updateProperty },
              (err, product) => {
                if (err) return errHandler(err, res);
                if (product) {
                  return res.json({
                    status: true,
                    message: "Product Updated Successfully",
                    data: product,
                  });
                }
              }
            );
          }
        }
      );
    }
  });
});

Router.get("/", (req, res) => {
  purchasesModel.getAllProducts((err, purchases) => {
    if (err) return errHandler(err, res);
    if (!purchases.length)
      return res.json({ status: false, message: "No purchases in DB" });
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
