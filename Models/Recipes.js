const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  shortDes: {
    type: String,
  },
  prep: {
    type: Number,
  },
  cookMins: {
    type: Number,
  },
  additionalMins: {
    type: Number,
  },
  totalTime: {
    type: Number,
  },
  servings: {
    type: Number,
  },
  yield: {
    type: Number,
  },
  ingredients:  {
    type: Array,
  },
  description: {
    type: String,
  },
  directions: {
    type: Array,
  },
  chefNote: {
    type: String,
  },
  nutrition: {
    type: Array,
  },
  video: {
    type: String,
  },
  socialMedia: {
    type: String,
  },
  chefName: {
    type: String,
  },
  date: {
    type: Date,
  },
  preserving: {
    type: Number,
  },
  preservingMeasure: {
    type: String,
  },
  preservin: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model("recipe", RecipeSchema);

