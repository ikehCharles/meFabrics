import mongoose from 'mongoose';
import moment from 'moment'

const customersSchema = mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  social: {
    type: String,
    required: false,
  },
  mode: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true,
    default: moment().format("M")
  },
  year: {
    type: String,
    required: true,
    default: moment().format("YYYY")
  }
});

const Customers = module.exports = mongoose.model("customers", customersSchema);

module.exports.addCustomer = async (customerDetails, callback) => {
  const newCustomer = new Customers(customerDetails);
  newCustomer.save(callback);
};
module.exports.getAllCustomers = async (callback) => {
  Customers.find({}, callback);
};
module.exports.getCustomerByName = async (customerDetails, callback) => {
  Customers.find({name: customerDetails.name}, callback);
};
module.exports.getCustomerByPhone = async (customerDetails, callback) => {
  Customers.find({phone: customerDetails.phone, callback});
};
module.exports.getCustomerByMode = async (customerDetails, callback) => {
  Customers.find({mode: customerDetails.mode}, callback);
};
module.exports.getCustomerById = async (customerDetails, callback) => {
  Customers.findById(customerDetails._id, callback);
};
module.exports.deleteById = async (customerDetails, callback) => {
  Customers.findByIdAndDelete(customerDetails._id, callback);
}
module.exports.updateSalesById = async (customerDetails, callback) => {
  Customers.findByIdAndUpdate(customerDetails._id, customerDetails, callback)
}