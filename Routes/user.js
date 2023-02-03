const router = require("express").Router();
const Users = require("../Models/Users");
const bcrypt = require("bcryptjs");
const cloudinary = require("../utils/cloudinary");

// signup User Route
router.post("/signup", async (req, res) => {
  const file = req?.files?.image;
  try {
    // Find Email
    const ExistUser = await Users.findOne({ email: req.body.email });

    if (ExistUser) {
      return res.status(422).json({ error:'true' ,Message: "Email alredy exist" });
    } else {
      // Image upload in cloudinary
      // const result = await cloudinary.uploader.upload(file.tempFilePath);

      // Password Hashing
      const hasPassword = await bcrypt.hash(req.body.password, 12);

      // Convert date string in Date
      dob = new Date(req.body.dob);
      req.body.dob = dob;

      // all Data add in model
      let userImageData = new Users({
        ...req.body,
        // image: result.secure_url,
        // cloudinary_id: result.public_id,
      });

      // Has password add in model data
      userImageData.password = hasPassword;

      // Data save in DB
      await userImageData.save();
      res
        .status(201)
        .json({error:'false', Message: "User registered successfuly", Data: userImageData });
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error.red, "ERROR".yellow);
  }
});

// Signin User Router
router.post("/signin", async (req, res) => {
  try {
    // Find Data
    const existUser = await Users.findOne({ email: req.body.email });

    if (existUser) {
      // Compare Password
      const checkPassword = await bcrypt.compare(
        req.body.password,
        existUser.password
      );

      if (checkPassword) {
        // Generate JWT token
        const token = await existUser.generateSigninToken();

        res.json({ Message: "User Signin Successfully", Token: token, UserData:existUser });
      } else {
        res.status(400).json({ Error: "Invalid Credientials" });
      }
    } else {
      res.status(400).json({ Error: "Invalid Credientials" });
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error.red, "ERROR".yellow);
  }
});

// Get User Route
router.get("/", async (req, res) => {
  try {
    let user = await Users.find();
    if (user.length > 0) {
      res.json(user);
    } else {
      res.json({ result: "Data Not Found" });
    }
  } catch (error) {
    console.log(error.red, "ERROR".yellow);
  }
});

module.exports = router;
