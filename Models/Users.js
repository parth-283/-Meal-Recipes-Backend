const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  dob: {
    type: Date,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  summary: {
    type: String,
  },
  state: {
    type: String,
  },
  gender: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  twiter: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  recipeIds: [
    {
      recipeId: {
        type: String,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Generating Token
UserSchema.methods.generateSigninToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error, "ERROR".red);
  }
};

const Users = mongoose.model("user", UserSchema);
module.exports = Users;
