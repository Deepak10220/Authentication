const express = require("express");
const ensureAuththenticated = require("../middleware/Auth");
const router = express.Router();

router.get("/", ensureAuththenticated, (req, res) => {
  console.log(req.user);
  res.status(200).json([
    {
      name: "iphone xr",
      price: 20000,
    },
    {
      name: "iphone 15",
      price: 65000,
    },
  ]);
});

module.exports = router;
