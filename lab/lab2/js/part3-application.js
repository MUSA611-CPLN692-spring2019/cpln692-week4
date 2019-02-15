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
var resetMap = function(myMarkers) {
  _.forEach(myMarkers, function(k) {
    map.removeLayer(k);
  });
};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var crimelist;
var getAndParseData = function() {
  $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-crime-snippet.json")
  .done(function(res) {
    crimelist = JSON.parse(res);
  });
};

/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */
var filterd = [];
var myfilter = function(list) {
  for (i = 0; i < list.length; i++) {
    //filter a certain type of crime within certain districts, and within certain Police Service Areas (PSA 1: checked, PSA 2: unchecked)
    if (list[i]['UCR Code']>= numericField1
      && list[i]['UCR Code'] <= numericField2)  {
      filterd.push(list[i]);
    }
  }
  return filterd;
};

var plotData = function() {
  myMarkers = _.each(myfilter(crimelist), (x) => {
    L.marker([x.Lat, x.Lng]).addTo(map).bindPopup(x['General Crime Category']);
  });
  /* =====================
    Fill out this function definition
  ===================== */
};
