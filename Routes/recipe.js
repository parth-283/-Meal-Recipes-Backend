const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const Recpies = require("../Models/Recipes");

// Post Recipe Route
router.post("/", async (req, res) => {
  const file = req.files.image;
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    let recipe = new Recpies({
      name: req.body.name,
      category: req.body.category,
      image: result.secure_url,
      shortDes: req.body.shortDes,
      prep: req.body.prep,
      cookMins: req.body.cookMins,
      additionalMins: req.body.additionalMins,
      totalTime: req.body.prep + req.body.additionalMins + req.body.cookMins,
      servings: req.body.servings,
      yield: req.body.yield,
      ingredients: req.body.ingredients,
      description: req.body.description,
      directions: req.body.directions,
      chefNote: req.body.chefNote,
      nutrition: req.body.nutrition,
      video: req.body.video,
      socialMedia: req.body.socialMedia,
      chefName: req.body.chefName,
      date: new Date(Date.now()).toISOString(),
      preserving: req.body.preserving,
      preservingMeasure: req.body.preservingMeasure,
      preservin: req.body.preservin,
      cloudinary_id: result.public_id,
    });
    // Save User
    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(400).send(error);
    console.log(error.red);
  }
});

// Get Recipe Route
router.get("/", async (req, res) => {
  try {
    let recipe = await Recpies.find();
    if (recipe.length > 0) {
      res.json(recipe);
    } else {
      res.json({ result: "Data Not Found" });
    }
  } catch (error) {
    console.log(error.red);
  }
});

// DELETE Recipe Route
router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let recipe = await Recpies.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(recipe.cloudinary_id);
    // delete recipe from db
    await recipe.remove();
    res.json(recipe);
  } catch (error) {
    console.log(error.red);
  }
});

// Update Recipe Route
router.put("/:id", async (req, res) => {
  try {
    let recipe = await Recpies.findById(req.params.id);
    let result;
    const file = req?.files?.image;
    if (file) {
      await cloudinary.uploader.destroy(recipe.cloudinary_id);
      result = await cloudinary.uploader.upload(file?.tempFilePath);
    }
    var newvalues = { $set: req.body };
    recipe = await Recpies.findByIdAndUpdate(req.params.id, newvalues, {
      new: true,
    });
    res.json(recipe);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
