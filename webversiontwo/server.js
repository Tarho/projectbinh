const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("Server is running on port 3001");
});
