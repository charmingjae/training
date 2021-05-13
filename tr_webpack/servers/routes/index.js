const express = require("express");
const router = express.Router();

router.get("/api/dd", (req, res) => {
  console.log("api");
  res.send("Hello");
});

module.exports = router;
