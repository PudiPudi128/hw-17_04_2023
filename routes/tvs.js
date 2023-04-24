const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const url = "http://fs1.co.il/bus/tv.php";
    const resJson = await axios.get(url);
    const map_ar = resJson.data.map((item) => {
      let newItem = {
        name: item.name,
        views: item.views,
      };
      return newItem;
    });
    //   console.log(resJson);
    res.json(map_ar);
  } catch (err) {
    res.json(err);
  }
});

router.get("/single/:index", async (req, res) => {
  try {
    const index = req.params.index;
    const url = "http://fs1.co.il/bus/tv.php";
    const resJson = await axios.get(url);
    res.json(resJson.data[index]);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.get("/search", async (req, res) => {
  try {
    const searchQ = req.query.s;
    const url = "http://fs1.co.il/bus/tv.php";
    const resJson = await axios.get(url);
    const filterArr = resJson.data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQ.toLowerCase()) ||
        item.descrption.toLowerCase().includes(searchQ.toLowerCase())
    );
    res.json(filterArr);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
