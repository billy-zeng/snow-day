//———————————————————————— Server Config ————————————————————————//
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;

const app = express();
const path = require("path");
const DB = require("./models");
const routes = require("./routes");

//————————————————————————— Middleware ——————————————————————————//
app.use(bodyParser.json());

//————————————————————————— API Routes ——————————————————————————//

app.use("/api/v1/users", routes.user);

//———————————————————————— Server Start —————————————————————————//
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}.`);
});
