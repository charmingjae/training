// server/routes index

// import db config file
const db = require("../../config/db");
const express = require("express");
const router = express.Router();

router.get("/api/dd", (req, res) => {
  const getDupCnt = "SELECT * FROM mentee";
  db.query(getDupCnt, (err, result) => {
    // var queryRes = result[0]["COUNT(*)"];
    // if (queryRes >= 1) {
    //   res.send(result);
    // } else {
    //   res.send({ result: 1 });
    // }
    res.send(result);
  });
});

module.exports = router;
