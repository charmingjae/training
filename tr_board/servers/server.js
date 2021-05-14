const express = require("express");
const app = express();
const cors = require("cors");
// use cors
app.use(cors());
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

// use routes
const route = require("./routes/index");

app.use(bodyParser.json());

app.get("/api/dd", route);

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
