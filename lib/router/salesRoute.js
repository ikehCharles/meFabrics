import express from 'express';
import productModel from '../model/productsModel';
import salesModel from '../model/salesModel';

const Router = express.Router();


const errHandler = (err, res) => {
  if (err) return res.json({ status: false, message: `error ${err}` });
};


Router.post("/add", async (req, res) => {
  const body = req.body;
  delete body["category"]
  let element;
  for (element in body) {
    if (body[element] === '') return res.json({ status: false, message: "Required field(s) missing" });
  }
  productModel.getProductById({ _id: body["fabricId"] }, (err, product) => {
    if (err) return errHandler(err, res);
    product = product[0];
    let quantity;
    if (body["measurement"] === "yard") {
      body["sellingAt"] = product.purchase[0].sellingPerYard
      quantity = parseFloat(body["quantity"])
      body["sellingAtTotal"] = product.purchase[0].sellingPerYard * quantity
    } else if (body["measurement"] === "trouser") {
      body["sellingAt"] = product.purchase[0].sellingPerTrouser
      quantity = (parseFloat(body["quantity"]) * 0.25) + parseFloat(body["quantity"]);
      body["sellingAtTotal"] = product.purchase[0].sellingPerTrouser * parseFloat(body["quantity"]);
    }
    if (product.remains === 0) {
      return res.json({ status: false, message: `${product.name} ${product.category} is out of stock` })
    } else {
      if ((product.remains - quantity) < 0) return res.json({ status: false, message: "yards exceed remaining available" })
      let isProductOutOfStock = false
      // console.log({...product})
      if ((product.remains - quantity) === 0) {
        isProductOutOfStock = true
        productModel.updateProductById({ ...product._doc, sold: true }, (err, soldOutProduct) => {
          if (err) return errHandler(err, res);
        })
      }
      productModel.updateProductById({ ...product, remains: (product.remains - quantity) }, (err, productUpdated) => {
        if (err) return errHandler(err, res);
        if (!productUpdated) return res.json({ status: false, message: "Could not update remains" })
        body["soldAtTotal"] = parseFloat(body["soldAt"]) * parseFloat(body["quantity"]);
        salesModel.addSales(body, (err, success) => {
          if (err) return errHandler(err, res);
          if (success) return res.json({ status: true, message: isProductOutOfStock ? "Sales added successfully, Fabric now out of stock" : "Sales added successfully", data: success });
        })
      });

    }


  })
})


Router.post("/remove", async (req, res) => {
  const body = req.body;
  let element;
  for (element in body) {
    if (body[element] === '') return res.json({ status: false, message: "sales id missing" })
  }
  salesModel.getSalesById(body, (err, sale) => {
    if (err) return errHandler(err, res)
    if (sale) {
      productModel.getProductById({ _id: sale.fabricId }, (err, fabric) => {
        if (err) return errHandler(err, res);
        if (fabric.length) {
          productModel.updateProductById({ ...fabric[0], remains: fabric[0].remains + parseFloat(sale.quantity) }, (err, success) => {
            if (err) return errHandler(err, res)
            if (success) {
              salesModel.deleteById(sale, (err, deleted) => {
                if (err) return errHandler(err, res);
                if (deleted) {
                  return res.json({ status: true, message: "sales deleted successfully", data: deleted })
                }
              })
            }
          })
        }
      })
    }
  })
  // salesModel.findByIdAndDelete(resource, (err, done) => {
  //   if (err) return res.json({ status: false, message: "Server error, Try again", adMessage: "Unable to delete product" })
  //   if (!done) return res.json({ status: false, message: "Unable to delete customer" })
  //   if (done) return res.json({ status: true, message: "Customer successfully deleted" });
  // })

})


Router.get("/", (req, res) => {
  salesModel.getAllSales((err, sales) => {
    if (err) return errHandler(err, res);
    // return console.log(sales)
    if (!sales.length) return res.json({ status: false, message: "No sales in DB" });
    return res.json({ status: true, data: sales });
  });
});





module.exports = Router;