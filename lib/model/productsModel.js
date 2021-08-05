import mongoose from 'mongoose';
import moment from 'moment';

const productsSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  yards: {
    type: Number,
    required: false,
  },
  remains: {
    type: Number,
    required: false,
  },
  purchaseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false, 
  },
  sold: {
    type: Boolean,
    required: false,
    default: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  }
});

const Products = module.exports = mongoose.model("products", productsSchema);

module.exports.addProduct = async (productDetails, callback) => {
  const newProduct = new Products(productDetails);
  newProduct.save(callback);
};
module.exports.getAllProducts = async (callback) => {
  Products.aggregate([
    {$lookup: {
      from: "purchases",
      localField: "purchaseId",
      foreignField: "_id",
      as: "purchase"
    }}
  ], callback);
};
module.exports.getProductByNameAndCategory = async (productDetails, callback) => {
  Products.aggregate(
    [{$match: {name: productDetails.name, category: productDetails.category}},
      {$lookup: {
        from: "purchases",
        localField: "purchaseId",
        foreignField: "_id",
        as: "purchase"
      }}
    ], callback);
};
module.exports.getProductByCategory = async (productDetails, callback) => {
  Products.aggregate(
    [{$match: {category: productDetails.category}},
      {$lookup: {
        from: "purchases",
        localField: "purchaseId",
        foreignField: "_id",
        as: "purchase"
      }}
    ], callback);
};
module.exports.getProductByImageUrl = async (productDetails, callback) => {
  Products.aggregate(
    [{$match: {imageUrl: productDetails.imageUrl}},
      {$lookup: {
        from: "purchases",
        localField: "purchaseId",
        foreignField: "_id",
        as: "purchase"
      }}
    ], callback);
};
module.exports.getProductById = async (productDetails, callback) => {
  Products.aggregate(
    [{$match: {_id: mongoose.Types.ObjectId(productDetails._id)}},
      {$lookup: {
        from: "purchases",
        localField: "purchaseId",
        foreignField: "_id",
        as: "purchase"
      }}
    ], callback);
};
module.exports.deleteById = async (productDetails, callback) => {
  Products.findByIdAndDelete(productDetails._id, callback);
}
module.exports.updateProductById = async (productDetails, callback) => {
  Products.findByIdAndUpdate(productDetails._id, productDetails, callback)
}