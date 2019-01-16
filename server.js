const express = require('express');

// Set up Express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});