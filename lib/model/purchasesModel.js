import mongoose from 'mongoose';
import moment from 'moment';

const purchasesSchema = mongoose.Schema({
  fabricId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  yards: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  sellingPerYard: {
    type: Number,
    required: true,
  },
  sellingPerTrouser: {
    type: Number,
    required: true,
  },
  quarter: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: moment().format('YYYY-MM-DD')
  },
  year: {
    type: String,
    required: true,
    default: moment().format('YYYY')
  }
});

const Purchases = module.exports = mongoose.model("purchases", purchasesSchema);

module.exports.addPurchase = async (purchaseDetails, callback) => {
  const newPurchase = new Purchases(purchaseDetails);
  newPurchase.save(callback);
};
module.exports.getAllPurchases = async (callback) => {
  Purchases.aggregate([
    {$lookup: {
      from: "products",
      localField: "fabricId",
      foreignField: "_id",
      as: "fabric"
    }}
  ], callback);
};
module.exports.getPurchasesByQuarter = async (productDetails, callback) => {
  Purchases.aggregate(
    [{$match: {quarter: productDetails.quarter}},
      {$lookup: {
        from: "products",
        localField: "fabricId",
        foreignField: "_id",
        as: "fabric"
      }}
    ], callback);
};
module.exports.getPurchaseById = async (purchaseDetails, callback) => {
  Purchases.aggregate([
    {$match: {_id: mongoose.Types.ObjectId(purchaseDetails._id)}},
    {$lookup: {
      from: "products",
      localField: "fabricId",
      foreignField: "_id",
      as: "fabric"
    }}
  ], callback);
};
module.exports.getPurchaseByFabricId = async (purchaseDetails, callback) => {
  Purchases.aggregate([
    {$match:{fabricId: mongoose.Types.ObjectId(purchaseDetails.fabricId)}},
    {$lookup: {
      from: "products",
      localField: "fabricId",
      foreignField: "_id",
      as: "fabric"
    }}
  ], callback);
};

module.exports.deleteById = async (purchaseDetails, callback) => {
  Purchases.findByIdAndDelete(purchaseDetails._id, callback);
}
module.exports.updateProductById = async (purchaseDetails, callback) => {
  Purchases.findByIdAndUpdate(purchaseDetails._id, purchaseDetails, callback)
}