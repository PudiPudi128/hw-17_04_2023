const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel, validateUser } = require("../models/userModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await UserModel.find({}).limit(20);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post("/", async (req, res) => {
  const validBody = validateUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const user = new UserModel(req.body);
    const hiddenPassword = "*".repeat(user.password.length);
    user.password = await bcrypt.hash(user.password,10);
    await user.save();
    user.password = hiddenPassword;
    res.json(user).status(201);
  }
   catch (err) {
    if(err.code == 11000){
      return res.status(401).json({msg:"Email already in system", code:11000})
    }
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
