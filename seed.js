const db = require("./models");
const resortData = require("./populateResorts.js");
db.Resort.create(resortData, (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(resortData);
});
