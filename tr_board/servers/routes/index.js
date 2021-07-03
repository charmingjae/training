// server/routes index

// import db config file
const { db, salt } = require("../../config/db");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");

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
  // declare userID, userPW
  const userID = req.body.userID;
  const userPW = req.body.userPW;

  function saltPassword(userPW) {
    return new Promise(function (resolve, reject) {
      crypto.pbkdf2(userPW, salt, 100000, 64, "sha512", (err, key) => {
        console.log(key.toString("base64"));
        resolve(key.toString("base64"));
      });
    });
  }

  async function handler(req, res) {
    const newPW = await saltPassword(userPW);
    return newPW;
  }

  (async () => {
    try {
      const getSaltedPW = await handler();

      console.log("asyTest : ", asyTest);

      const sql = "SELECT COUNT(*) FROM member WHERE userID=? AND userPW =?";

      db.query(sql, [userID, getSaltedPW], (err, result) => {
        console.log(result[0]["COUNT(*)"]);
        if (result[0]["COUNT(*)"] >= 1) {
          res.send({ result: "success", userID: userID });
        } else {
          res.send({ result: "failed" });
        }
      });
    } catch (error) {
      console.log(error);
    }
  })();
});

// [SignUp.js] Do register router
router.post("/api/register", (req, res) => {
  const userID = req.body.userID;
  var userPW = req.body.userPW;
  const userPhone = req.body.userPhone;

  function saltPassword(userPW) {
    return new Promise(function (resolve, reject) {
      crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(userPW, salt, 100000, 64, "sha512", (err, key) => {
          console.log(key.toString("base64"));
          resolve(key.toString("base64"));
        });
      });
    });
  }

  async function handler(req, res) {
    const newPW = await saltPassword(userPW);
    return newPW;
  }

  (async () => {
    try {
      const asyTest = await handler();

      console.log("asyTest : ", getSaltedPW);

      const dbQuery =
        "INSERT INTO member(userID, userPW, userPhone) VALUES(?,?,?)";
      db.query(dbQuery, [userID, getSaltedPW, userPhone], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.affectedRows >= 1) {
            console.log("REGISTER SUCCESS");
            res.send({ result: "success", userID: userID });
          } else {
            console.log("REGISTER failed");
            res.send({ result: "failed" });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  })();
});

module.exports = router;
