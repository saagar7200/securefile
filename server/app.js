const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/connection");
app.use(express.json());
const route = require("./route/auth");
app.use(route);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(" connected successfully at port 5000");
});
