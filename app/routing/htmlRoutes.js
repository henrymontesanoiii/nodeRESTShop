const path = require("path");

module.exports = function (app) {
  //set up home route
  app.get("/", function (req, res) {
    res.json('hello world!')
    // res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  app.get("/home", function (req, res) {
    res.json('you are home')
    // res.sendFile(path.join(__dirname, "../public/index.html"));
  });
 
};