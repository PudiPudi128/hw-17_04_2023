const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data } = await axios.get("https://monkeys.co.il/api2/covid19.php");
    res.json(data);
  } catch (error) {
    res.json(error);
    res.status(502).json({ err });
    console.error(error);
  }
});

router.get("/single/country/:name", async (req, res) => {
  try {
    const { data } = await axios.get("https://monkeys.co.il/api2/covid19.php");
    const name = req.params.name;
    const filtetData = data.find(
      (item) => item.country.toLowerCase() === name.toLowerCase()
    );
    res.json(filtetData);
  } catch (error) {
    res.json(error);
    res.status(502).json({ err });
    console.error(error);
  }
});

module.exports = router;
