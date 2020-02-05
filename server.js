//———————————————————————— Server Config ————————————————————————//
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;

const app = express();
const path = require("path");
const DB = require("./models");
const routes = require("./routes");

//————————————————————————— Middleware ——————————————————————————//
app.use(bodyParser.json());

// User Session
app.use(
  session({
    store: new MongoStore({
      url: process.env.MONGODB_URI || "mongodb://localhost:27017/snowDay"
    }),
    secret: "fqeiofjasdkanvalrugahrflkndsvkjabsaDLSHFBA",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 4 }
  })
);

//————————————————————————— API Routes ——————————————————————————//

app.use("/api/v1/users", routes.user);
app.use("/api/v1/resorts", routes.resort);
app.use("/api/v1/weather", routes.weather);

//————————————————————————— HTML Routes ——————————————————————————//

app.use("/", routes.views);

//————————————————————————————— Verify —————————————————————————————//

app.get("/api/v1/verify", (req, res) => {
  if (!req.session.currentUser) {
    return res
      .status(401)
      .json({ error: "unauthorized, please log in and try again." });
  }
  res.status(200).json(req.session.currentUser);
});

//———————————————————————— Server Start —————————————————————————//
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}.`);
});
