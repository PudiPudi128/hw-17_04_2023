const express = require("express");
const router = express.Router();
const { songModel, validateSong } = require("../models/songModel");

router.get("/",async (req,res) => {
  try {
    const perPage = 3;
    const page = req.query.page -1 || 0
    const data = await songModel.find({}).limit(perPage).skip(perPage * page);
    res.json(data)
  }
   catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post("/", async (req, res) => {
    const validBody = validateSong(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        const user = new songModel(req.body);
        await user.save();
        res.status(201).json(user)
      }
       catch (err) {
        if(err.code == 11000){
            return res.status(401).json({msg:"Song already in the system", code:11000})
        }
        console.log(err);
        res.status(502).json({ err });
      }
})

module.exports = router;