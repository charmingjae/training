// server/routes index

// import db config file
const db = require("../../config/db");
const express = require("express");
const router = express.Router();

// * How to use Database
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

// [SignIn.js] Do login router
router.post("/api/login", (req, res) => {
  console.log(req.body);
});

// [SignUp.js] Do register router
router.post("/api/register", (req, res) => {
  console.log("[/api/register] : ", req.body);
});

module.exports = router;
