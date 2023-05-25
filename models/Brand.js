const mongoose = require("mongoose");
const { Schema } = mongoose;

const brandSchema = new Schema({
  name: [String],
  createdAt: { type: Date, default: Date.now },
});

mongoose.model("Brand", brandSchema);
