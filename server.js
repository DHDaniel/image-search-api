
const express = require("express");
const searchImage = require("./local_js/bingImageSearch.js");

var app = express();

/* Configuration */

app.set("port", process.env.PORT || 8080);

// for "latest" API
var recent_queries = [];

/* Routing and logic */

app.get("/api/search", function (req, res) {
  var searchTerm = req.query.q;
  var page = (req.query.page) ? req.query.page : 1;
  var today = new Date();
  var timelog = today.toUTCString();

  searchImage(searchTerm, page, function (err, data) {
    if (err) console.log(err);

    // sending data back
    res.end(JSON.stringify(data));

    // adding to recent searches. Limits to 10 by default, stores it in RAM
    // adds it as the first element of the array
    recent_queries.unshift({
      query : searchTerm,
      time : timelog
    });
    recent_queries = recent_queries.slice(0, 10);
  });
});

app.get("/api/latest", function (req, res) {

  res.end(JSON.stringify(recent_queries));

})



/* Starting */

app.listen(app.get("port"), function () {
  console.log("App is running at port", app.get("port"));
})
