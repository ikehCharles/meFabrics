import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/me_fabric_store', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;