require("colors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Connect DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongodb is Connected".blue)
)
  .catch((err) => console.log("Connection Error".red,err));

module.exports = mongoose;
