const mongoose = require("mongoose");
const CountModel = require("./CountModel");
const Images = require("./imageGelleryModel");

const reviewsSchema = new mongoose.Schema({
  review_uuid: {
    type: String,
    default: null,
  },
  user: {
    type: Number,
    ref: "user",
  },
  imageid: {
    type: String,
    default: null,
  },
  rating: {
    type: Number,
    default: null,
  },
  comment: {
    type: String,
    default: null,
  },
  productid: {
    type: Number,
  },
  product_uuid: {
    type: String,
    default: null,
  },
  createdate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("reviewsSchema", reviewsSchema);
