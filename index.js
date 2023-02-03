const express = require("express");
const recipe = require("./Routes/recipe");
const user = require("./Routes/user");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("colors");
require("./config/mdb");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4500;

// app.use(express.cookieParser());
app.use(cookieParser());
app.use(cors());

const fileUpload = require("express-fileupload");
const { use } = require("./Routes/recipe");

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Middleware
app.use(express.json());

//Welcome message
app.get("", (req, res) => {
  // set response header
  res.writeHead(200, { "Content-Type": "text/html" });
  // set response content
  res.write(
    "<html><body><h1>Welcome To Recipe Management system.</h1></body></html>"
  );
  res.end();
});

// Route
app.use("/recipe", recipe);
app.use("/user", user);

app.listen(PORT, () => {
  console.log(`App is listing at http://localhost:${PORT}`.blue);
});
