import express from 'express';
import productModel from '../model/productsModel';
import salesModel from '../model/salesModel';
import customerModel from '../model/customersModel';

const Router = express.Router();


const errHandler = (err, res) => {
  if (err) return res.json({ status: false, message: `error ${err}` });
};


Router.post("/add", async (req, res) => {
  const body = req.body;
  let element;
  const name = {};
  for (element in body) {
    if(element === "first" || element === "last"){
      if(body[element] === "") return res.json({ status: false, message: "'name' field(s) missing" });
    }
    if(element === "phone"){
      if(body[element] === "") return res.json({ status: false, message: "Phone number field missing" });
      if(parseInt(body[element][0]) !== 0 || body[element].length !== 11){
        return res.json({status: false, message: "Phone number not valid"});
      }
    }
    if (element === 'first' || element === 'last') {
      if (element === "first") {
        name["first"] = body[element];
      } else {
        name["last"] = body[element];
      }
      continue
    }
    if(element === "mode") {
      if(body[element] === "") return res.json({ status: false, message: "Mode of acquisition missing"});
    }
  }
  const customer = { ...body, name }
  customerModel.getCustomerByName(customer, (err, customerResByName) => {
    if (err) return errHandler(err, res);
    if (customerResByName.length) return res.json({ status: false, message: "Customer already exist" });
    customerModel.addCustomer(customer, (err, success) => {
      if (err) return errHandler(err, res);
      if (success) return res.json({ status: true, message: "Customer added successfully", data: success })
    })
  })

})

Router.get("/", (req, res) => {
  customerModel.getAllCustomers((err, customers) => {
    if (err) return errHandler(err, res);
    if (!customers.length) return res.json({ status: false, message: "No customers in DB" });
    return res.json({ status: true, data: customers });
  });
});

Router.get("/customer/:_id", (req, res) => {
  customerModel.getCustomerById(req.params, (err, customer) => {
    if (err) return errHandler(err, res);
    if (!customer) return res.json({ status: false, message: "Customer not found in DB" });
    return res.json({ status: true, data: customer });
  });
});

Router.post("/remove", async (req, res) => {
  const body = req.body;
  let element;
  for (element in body) {
    if (body[element] === '') return res.json({ status: false, message: "customer id missing" })
  }
  console.log(body)
  customerModel.findByIdAndDelete(body, (err, done) => {
    if (err) return res.json({ status: false, message: "Server error, Try again", adMessage: "Unable to delete customer" })
    if (!done) return res.json({ status: false, message: "Unable to delete customer" })
    if (done) return res.json({ status: true, message: "Customer successfully deleted" });
  })

})


module.exports = Router;