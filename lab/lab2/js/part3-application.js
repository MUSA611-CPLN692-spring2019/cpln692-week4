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
  /* =====================
    Fill out this function definition
  ===================== */
var fiteredMarkers = _.filter(myData,  function(myData){
                    return myData.YEARBUILT > 2010 && myData.YEARBUILT < 2017;
                }); //This function tries to filter the solar installation markers by year they were built
};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var phillySolarInstallationDataUrl = "https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json";

var getAndParseData = function(website) {
  var downloadData = $.ajax(website).done(function(ajaxResponseValue) {
  console.log(ajaxResponseValue); //Downloads the data and makes sure that it downloaded properly, it did

  var parseData = _.map(JSON.parse(ajaxResponseValue), function(obj) {
    return _.pick(obj, 'Y', 'X', 'NAME');
})
for (var i=0; i <parseData.length; i = i+1) {
    console.log(parseData[i]) //Loops through the raw downloaded data and parses it
    }
})
}
var myData = getAndParseData(phillySolarInstallationDataUrl) //Parses the raw data by applying the function above to the URL
console.log(myData); //This prints the parsed data directly to the console to make sure it worked, it did

/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */
//var plotData = function(obj) {

//};

var makeMarkers = function(obj) {
    return L.marker([obj.Y, obj.X]).bindPopup(obj.NAME)
}; //First tries to make the markers in a separate function
for (var i=0; i <getAndParseData.length; i = i+1) {
} // Loops through the parsed data to try and make the markers
var plotData = function(obj) { //This function simply tries to add the markers made above to the map
    return makeMarkers(getAndParseData[i]).addTo(map)
};
