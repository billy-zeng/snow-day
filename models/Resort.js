const mongoose = require("mongoose");
const Review = require("./Review");

const ResortSchema = new mongoose.Schema({
  name: String,
  address: String,
  lat: Number,
  lng: Number,
  elevation_base: Number,
  elevation_summit: Number,
  lifts: Number,
  runs: Number,
  mainWebsite: String,
  ticketWebsite: String,
  phoneNumber: String,
  images: [String],
  reviews: [Review.schema]
});

const Resort = mongoose.model("Resort", ResortSchema);

module.exports = Resort;
