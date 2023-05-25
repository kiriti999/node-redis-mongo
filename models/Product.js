const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  names: [String],
  createdAt: { type: Date, default: Date.now },
});

mongoose.model("Product", productSchema);
