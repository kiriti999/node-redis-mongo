const mongoose = require("mongoose");
const { Schema } = mongoose;

const pants = new Schema({
  model: String,
  type: String,
  size: Number
})

const shirts = new Schema({
  model: String,
  type: String,
  size: Number
})

const socks = new Schema({
  model: String,
  type: String,
  size: Number
})

const categorySchema = new Schema({
  categories: [pants, shirts, socks],
  createdAt: { type: Date, default: Date.now },
});

mongoose.model("Category", categorySchema);
