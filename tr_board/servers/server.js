// Const
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const route = require("./routes/index");
const app = express();
const port = process.env.PORT || 3001;

// Uses
app.use(cors());
app.use(bodyParser.json());

// Method
// get
app.get("/api/dd", route);
app.get("/api/getumbcnt", route);
app.get("/api/getrentlist", route);
app.get("/api/getapplylist", route);
app.get("/api/getoverduelist", route);
// post
app.post("/api/login", route);
app.post("/api/register", route);
app.post("/api/dorent", route);
app.post("/api/doapply", route);
app.post("/api/doCheckIsRent", route);
app.post("/api/doRentInfo", route);
app.post("/api/doSetUmb", route);
app.post("/api/returnumb", route);
app.post("/api/returnapply", route);
app.post("/api/doCheckIsApply", route);
app.post("/api/getfilterapplylist", route);
app.post("/api/getfilterrentallist", route);
app.post("/api/getfilteroverduelist", route);

// When start server
app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
