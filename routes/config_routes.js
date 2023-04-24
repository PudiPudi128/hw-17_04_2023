const indexR = require("./index");
const usersR = require("./users");
const productsR = require("./products");
const foodsR = require("./foods");
const covidR = require("./covid");
const countryR = require("./countries");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/products", productsR);
  app.use("/foods", foodsR);
  app.use("/covid", covidR);
  app.use("/country", countryR);
};
