//———————————————————————— Server Config ————————————————————————//
const exptress = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;

const app = express();
const path = require("path");
const DB = require("./models");

//————————————————————————— Middleware ——————————————————————————//
app.use(bodyParser.json());

//————————————————————————— API Routes ——————————————————————————//

//———————————————————————— Server Start —————————————————————————//
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}.`);
});
