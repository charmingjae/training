// server/routes index

// import db config file
const { db, salt } = require("../../config/db");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const hot = require("react-hot-loader");

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

router.post("/api/login", (req, res) => {
  const userID = req.body.userID;
  const userPW = req.body.userPW;

  function saltPassword(userPW) {
    return new Promise(function (resolve, reject) {
      crypto.pbkdf2(userPW, salt, 100000, 64, "sha512", (err, key) => {
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
      const sql =
        "SELECT COUNT(*), ANY_VALUE(auth) FROM member WHERE userID=? AND userPW =?";
      db.query(sql, [userID, getSaltedPW], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(result[0]["COUNT(*)"]);
          if (result[0]["COUNT(*)"] >= 1) {
            res.send({
              result: "success",
              userID: userID,
              userAuth: result[0]["ANY_VALUE(auth)"],
            });
          } else {
            res.send({ result: "failed" });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  })();
});

router.post("/api/register", (req, res) => {
  console.log(req.body);
  const userID = req.body.userID;
  const studentNum = req.body.studentNum;
  var userPW = req.body.userPW;
  const userPhone = req.body.userPhone;
  console.log(userID, studentNum, userPW, userPhone);

  function saltPassword(userPW) {
    return new Promise(function (resolve, reject) {
      crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(userPW, salt, 100000, 64, "sha512", (err, key) => {
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
        "INSERT INTO member(userID, userPW, userPhone, studentNum) VALUES(?,?,?,?)";
      db.query(
        dbQuery,
        [userID, getSaltedPW, userPhone, studentNum],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            if (result.affectedRows >= 1) {
              res.send({ result: "success", userID: userID });
            } else {
              res.send({ result: "failed" });
            }
          }
        }
      );
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
  const userName = req.body.selData[0]["userName"];
  // const qryRentUmb = "UPDATE umbInfo SET etc = etc - 1";
  const qryAddRentList =
    "INSERT INTO rentList(userName, returnDate, studentNum) VALUES(?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 5 DAY),(SELECT studentNum FROM member where userID = ?))";
  const qryDeleteApplyList =
    "DELETE FROM applyList WHERE studentNum = (SELECT studentNum FROM member WHERE userID=?) ";
  db.query(qryAddRentList, [userName, userName], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(qryDeleteApplyList, [userName], (err, result) => {
        if (err) {
          res.send({ result: "failed" });
        } else {
          res.send({ result: "success" });
        }
      });
    }
  });
});

router.post("/api/doapply", (req, res) => {
  const userName = req.body["user"];
  const qryRentUmb = "UPDATE umbInfo SET etc = etc - 1";
  const qryAddRentList =
    "INSERT INTO applyList(userName, studentNum) VALUES(?,(SELECT studentNum FROM member where userID = ?))";
  db.query(qryRentUmb, (err, result) => {
    if (!err) {
      db.query(qryAddRentList, [userName, userName], (err, result) => {
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

router.post("/api/doCheckIsApply", (req, res) => {
  const userName = req.body["user"];
  const qryCheckIsRent = "SELECT COUNT(*) FROM applyList WHERE userName = ?";
  db.query(qryCheckIsRent, [userName], (err, result) => {
    if (!err) {
      if (result[0]["COUNT(*)"] >= 1) {
        res.send({ result: "success", isApply: "true" });
      } else {
        res.send({ result: "success", isApply: "false" });
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

router.post("/api/doSetUmb", (req, res) => {
  const umbCount = req.body["cntUmbrella"];
  const qrySetUmbCount = "UPDATE umbInfo SET etc=? WHERE idx=1";
  db.query(qrySetUmbCount, [umbCount], (err, result) => {
    if (!err) {
      console.log(result);
      res.send({
        result: "success",
      });
    } else {
      console.log(err);
    }
  });
});

router.get("/api/getrentlist", (req, res) => {
  const qryGetRentList =
    "SELECT userName, DATE_FORMAT(rentDate,'%Y-%m-%d') as rentDate, DATE_FORMAT(returnDate,'%Y-%m-%d') as returnDate, studentNum FROM rentList";
  db.query(qryGetRentList, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

router.post("/api/returnumb", (req, res) => {
  const element = req.body.selData;
  let arrStudentNum = [];
  element.forEach((element) => {
    arrStudentNum.push(element.studentNum);
  });

  const qryReturnUmb = "DELETE FROM rentList where studentNum IN (?)";
  db.query(qryReturnUmb, [arrStudentNum], (err, result) => {
    if (!err) {
      res.send({ result: "success" });
    } else {
      console.log(err);
    }
  });
});

router.get("/api/getapplylist", (req, res) => {
  const qryGetRentList = "SELECT userName, studentNum FROM applyList";
  db.query(qryGetRentList, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

router.post("/api/returnapply", (req, res) => {
  const element = req.body.selData;
  let arrStudentNum = [];
  element.forEach((element) => {
    arrStudentNum.push(element.studentNum);
  });

  const qryReturnUmb = "DELETE FROM applyList where studentNum IN (?)";
  db.query(qryReturnUmb, [arrStudentNum], (err, result) => {
    if (!err) {
      res.send({ result: "success" });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
