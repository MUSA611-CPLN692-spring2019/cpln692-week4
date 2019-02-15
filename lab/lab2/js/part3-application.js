/* =====================
  Lab 2, part3: a full application

  We're going to use the skills we've just been practicing to write a full application
  which is responsive to user input.
  At your disposal are a set of variables which we use to track user input (see
  part3-main.js and part3-setup.js for more details on how this is done — we'll
  cover this topic at a later date). Their values will be logged to console to
  aid in debugging.

  In this lab, which is very much open-ended, your task is to use the value of
  these variables to define the functions below. Try to come up with interesting
  uses of the provided user input.

  Some ideas:
    There are two numeric fields: can you write this application to filter
    using both minimum and maximum?
    There is a boolean (true/false) field: can you write your code to filter according
    to this boolean? (Try to think about how you could chop up this data to make this meaningful.)
    There is a string field: can you write your code to filter/search based on user
    input?

  Remember, this is open-ended. Open ended doesn't mean pointless: we're looking for
  filters that might actually be useful. Try to see what you can produce.
===================== */

/* =====================
  Define a resetMap function to remove markers from the map and clear the array of markers
===================== */
var resetMap = function() {
  _.forEach(myMarkers, function(o) {
    map.removeLayer(o);
  });
  myMarkers = null;
};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var getAndParseData = function() {
  var Url = "http://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-crime-snippet.json";
  var d = $.ajax(Url).done(function(d) {
    myData = JSON.parse(d);
  });
};

/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */
// Define a filter function to check each entry if they match the user defined criteria.
var filter = function(list2bchecked) {
  var filteredlist = [];
  for (var i = 0; i < list2bchecked.length; i++) {
    let checker = 0; // To record the number of checks that each entry passes.

    // UCR Code Check.
    if (list2bchecked[i]["UCR Code"] >= numericField1 && list2bchecked[i]["UCR Code"] <= numericField2) {
      checker++;
    }
    // Location block check.
    var lb_upperCase = list2bchecked[i]['Location Block'].toUpperCase(); // Set everything to uppercase so that it doesnt matter.
    if (lb_upperCase.includes(stringField,)) {
      checker++;
    }
    // PSA=1 check.
    if (booleanField==true) {
      if (list2bchecked[i]['PSA']==1){checker++;} // Check if PSA is 1, but only if user requires.
    } else {checker++;} // If user does not specify PSA=1, then this check auto-passes.

    // If all 3 checks are true
    if (checker == 3) {
      filteredlist.push(list2bchecked[i]);
    }
  };
  return filteredlist;
}

var makeMarkers = function (ll){
  var listofmarkers=[];
  _.each(ll, function(o){listofmarkers.push(L.marker([o.Lat, o.Lng]))});
  return listofmarkers;
}

var plotMarkers = function(ll) {
  _.each(ll, function(o){o.addTo(map);});
};

var plotData = function() {
  var tobeplotted = filter(myData);
  console.log("FOUND " + tobeplotted.length + ' CRIMES THAT MATCH.');

  myMarkers = makeMarkers(tobeplotted);
  plotMarkers(myMarkers);
};
