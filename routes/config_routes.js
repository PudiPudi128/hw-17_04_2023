const indexR = require("./index");
const covidR = require("./covid");
const tvsR = require("./tvs");
const drinksR = require("./drinks");
const usersR = require("./users");
const songsR = require("./songs");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/covid", covidR);
  app.use("/tvs", tvsR);
  app.use("/drinks", drinksR);
  app.use("/users", usersR);
  app.use("/songs", songsR);
};
