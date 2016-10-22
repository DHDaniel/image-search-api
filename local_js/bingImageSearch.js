
const https = require("https");
const querystring = require("querystring");

var apiKey = process.env.BING_SEARCH_API_KEY;

/*
Queries the Bing Image Search API, and returns 10 results based on the
search query.
@param searchQuery the query string to be sent
@param page specifies the page number to look for
@param callback callback function to be called on data. It gets passed an error
parameter, and a data parameter (an array of the results)
*/

function queryBing(searchQuery, page, callback) {

  // look at Bing API for reference
  // https://msdn.microsoft.com/en-us/library/dn760791.aspx#Headers
  var search = querystring.stringify({
    q : searchQuery,
    count : 10,
    offset : page * 10,
    safeSearch : "Off"
  });

  // neccesary options. API key is an environment variable
  var req_options = {
    hostname : "api.cognitive.microsoft.com",
    path : "/bing/v5.0/images/search?" + search,
    method : "GET",
    protocol : "https:",
    headers : {
      "Ocp-Apim-Subscription-Key" : apiKey
    }
  }

  https.request(req_options, function (res) {
    res.setEncoding("utf-8");

    var response_str = '';

    // concatenating data
    res.on("data", function (chunk) {
      response_str += chunk;
    });

    // cleaning up data before returning it
    res.on("end", function () {
      var data = JSON.parse(response_str);

      // sending error
      if (data.statusCode == 404) {
        return callback({error: "Not found"});
      }

      var results = [];

      // looping through data to obtain what we want
      for (var i = 0; i < data.value.length; i++) {
        var imageObj = data.value[i];
        var newImgObj = {
          title : imageObj.name, // alt text
          url : imageObj.contentUrl, // image url
          pageUrl : imageObj.hostPageUrl, // page url
          thumbnail : imageObj.thumbnailUrl // thumbnail url
        }

        results.push(newImgObj);
      }

      // sending with no error
      return callback(undefined, results);
    });
  }).end();
}

queryBing("Asa Akira XXX", 1, function (err, data) {
  if (err) console.log(err);

  console.log(data);
});
