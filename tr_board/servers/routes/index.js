// server/routes index

// import db config file
const db = require("../../config/db");
const express = require("express");
const router = express.Router();

// * How to use Database
router.get("/api/dd", (req, res) => {
  const getDupCnt = "SELECT * FROM member";
  db.query(getDupCnt, (err, result) => {
    // var queryRes = result[0]["COUNT(*)"];
    // if (queryRes >= 1) {
    //   res.send(result);
    // } else {
    //   res.send({ result: 1 });
    // }
    // console.log("HelloWorld");
  });
});

// [SignIn.js] Do login router
// Need refactoring
router.post("/api/login", (req, res) => {
  console.log(req.body);

  // declare userID, userPW
  const userID = req.body.userID;
  const userPW = req.body.userPW;

  const sql = "SELECT COUNT(*) FROM member WHERE userID=? AND userPW =?";

  db.query(sql, [userID, userPW], (err, result) => {
    console.log(result[0]["COUNT(*)"]);
    if (result[0]["COUNT(*)"] >= 1) {
      res.send({ result: "success", userID: userID });
    } else {
      res.send({ result: "failed" });
    }
  });
});

// [SignUp.js] Do register router
router.post("/api/register", (req, res) => {
  const userID = req.body.userID;
  const userPW = req.body.userPW;
  const userPhone = req.body.userPhone;

  const dbQuery = "INSERT INTO member(userID, userPW, userPhone) VALUES(?,?,?)";
  db.query(dbQuery, [userID, userPW, userPhone], (err, result) => {
    if (result.affectedRows >= 1) {
      console.log("REGISTER SUCCESS");
      res.send({ result: "success", userID: userID });
    } else {
      console.log("REGISTER failed");
      res.send({ result: "failed" });
    }
  });
});

module.exports = router;
