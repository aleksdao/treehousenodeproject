//problem: We need a simple way to look at a user's badge count and Javascript points.

var http = require("http");
//breaking out different functions for different purposes
//Print out message
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in Javascript.";
  console.log(message);
}

//print out error messages
function printError(error) {
  console.error(error.message)
}

function get(username){
  //connect to the API URL (http://teamtreehouse.com/username.json)
  var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response) {
  var body = "";
    //read the data returned by http response
  response.on('data', function(chunk) {
    body += chunk;
  });
  response.on('end', function() {
    if (response.statusCode === 200) {
      try{
        //parse the data
        var profile = JSON.parse(body)
        //pass JSON properties into argument; print the data
        printMessage(username, profile.badges.length, profile.points.Javascript)
      } catch(error) {
        //print error if can't parse via JSON
        printError(error)
      }
    }
    else {
      //if status code error, print following msg
      printError({message: "There was a problem getting information for the user " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"})
    }
  });
    
    
});
  
  //Connection error
  request.on("error", printError)
}

//export a function called 'get' that is called 'get' in profile.js
module.exports.get = get;