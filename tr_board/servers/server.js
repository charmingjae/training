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
// app.use("/api", route);

// app.use("/api", (req, res) => res.json({ username: "bryan" }));

app.get("/api/dd", route);

// app.get("/api/dd", (req, res) => {
//   console.log("api");
//   res.send("Hello");
// });

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
