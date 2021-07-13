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
router.post("/api/login", (req, res) => {
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
      const getSaltedPW = await handler();
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

router.get("/api/getumbcnt", (req, res) => {
  const getUmbCnt = "SELECT etc FROM umbInfo";
  db.query(getUmbCnt, (err, result) => {
    res.send({ result: "success", umbCnt: result[0]["etc"] });
  });
});

router.post("/api/dorent", (req, res) => {
  const userName = req.body["user"];
  const qryRentUmb = "UPDATE umbInfo SET etc = etc - 1";
  const qryAddRentList =
    "INSERT INTO rentList(userName, returnDate) VALUES(?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 5 DAY))";
  db.query(qryRentUmb, (err, result) => {
    if (!err) {
      db.query(qryAddRentList, [userName], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send({ result: "success" });
        }
      });
    }
  });
});

router.post("/api/doCheckIsRent", (req, res) => {
  const userName = req.body["user"];
  const qryCheckIsRent = "SELECT COUNT(*) FROM rentList WHERE userName = ?";
  db.query(qryCheckIsRent, [userName], (err, result) => {
    if (!err) {
      if (result[0]["COUNT(*)"] >= 1) {
        res.send({ result: "success", isRent: "true" });
      } else {
        res.send({ result: "success", isRent: "false" });
      }
    } else {
      console.log(err);
    }
  });
});

router.post("/api/doRentInfo", (req, res) => {
  const userName = req.body["user"];
  const qryGetRentInfo =
    "SELECT rentDate, returnDate FROM rentList WHERE userName = ? ";
  db.query(qryGetRentInfo, [userName], (err, result) => {
    if (!err) {
      res.send({
        result: "success",
        rentDate: result[0]["rentDate"],
        returnDate: result[0]["returnDate"],
      });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
