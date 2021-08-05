import mongoose from 'mongoose';
import moment from 'moment';
import productModel from './productsModel'

const salesSchema = mongoose.Schema({
  fabricId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  soldAt: {
    type: Number,
    required: true,
  },
  sellingAt: {
    type: Number,
    required: true,
  },
  measurement: {
    type: String,
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  paid: {
    type: String,
    required: false,
  },
  received: {
    type: Boolean,
    required: true,
    default: false,
  },
  mode: {
    type: String,
    required: true,
  },
  soldAtTotal : {
    type: Number,
    required: true
  },
  sellingAtTotal : {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true,
    default: moment().format('YYYY-MM-DD'),
  },
});

const Sales = module.exports = mongoose.model("sales", salesSchema);

module.exports.addSales = async (salesDetails, callback) => {
  const newSale = new Sales(salesDetails);
  newSale.save(callback);
};
module.exports.getAllSales = async (callback) => {
  Sales.aggregate(
    [
      {$lookup: {
        from: "products",
        localField: "fabricId",
        foreignField: "_id",
        as: "fabric"
      }},
      
      {$lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "_id",
        as: "customer"
      }},

    ], callback);
};
module.exports.getSalesByMonthAndYear = async (salesDetails, callback) => {
  Sales.find({month: salesDetails.month, year: salesDetails.year}, callback);
};
module.exports.getSalesByDate = async (salesDetails, callback) => {
  Sales.find({category: salesDetails.category, callback});
};
module.exports.getSalesByMode = async (salesDetails, callback) => {
  Sales.find({mode: salesDetails.mode}, callback);
};
module.exports.getSalesById = async (salesDetails, callback) => {
  Sales.findById(salesDetails._id, callback);
};
module.exports.getAllSalesAndProducts = async (callback) => {
  Sales.aggregate([
    {$lookup: {
      from: "products",
      localField: "fabricId",
      foreignField: "_id",
      as: "fabric"
    }},
    {$lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }}
  ], callback);
};
module.exports.deleteById = async (salesDetails, callback) => {
  Sales.findByIdAndDelete(salesDetails._id, callback);
}
module.exports.updateSalesById = async (salesDetails, callback) => {
  Sales.findByIdAndUpdate(salesDetails._id, salesDetails, callback)
}