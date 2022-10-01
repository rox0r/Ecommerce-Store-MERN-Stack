const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "description cannot be empty"],
  },
  price: {
    type: Number,
    required: [true, "Price cannot be empty"],
    min: 0,
    max: 10000,
  },
  stock: {
    type: Number,
    required: [true, "Stock cannot be empty"],
    min: 0,
    max: 10000,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
