const cloudinary = require("cloudinary").v2;

const cloud_name = 'food-recipes'
const api_key = '561823732378912'
const api_secret = 'te-NVe3uoJdQwIbjWVrOKV6H21Q'


cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret
});

module.exports = cloudinary;
