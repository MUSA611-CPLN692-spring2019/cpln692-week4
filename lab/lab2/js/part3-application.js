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
    _.each(markers, function(marker){
      map.removeLayer(marker);
    });
  /* =====================
    Fill out this function definition
  ===================== */
};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var bikeCrashPhillyUrl = "https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-bike-crashes-snippet.json";

  /* =====================
    Fill out this function definition
  ===================== */

  // its essential to define mydata out of the scope of ajax function below
  var mydata;
  var getAndParseData = function() {
    bikedata=$.ajax(bikeCrashPhillyUrl)
    .done(function(bikedata){
       mydata=JSON.parse(bikedata);
      console.log(mydata);
      console.log('done?');
    });
    };
      console.log(mydata);//????????not defined```
/*
var myfilter=[]; //filter year, police agc and dringking or not
_.each(mydata, function(crash){
  if(crash.CRASH_YEAR>=numericField1&&
    crash.CRASH_YEAR<=numericField2 &&
    crash.POLICE_AGC== stringField &&
    (crash.DRINKING_D==1)==booleanField) {
      myfilter.push(crash);
    } return myfilter;
}); //NOT ABLE TO ACCESS mydata...


/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */

 //filter year, police agc and dringking or not

var myfilter =function (crash){
  var myfilter=[];
  _.each(mydata, function(crash){
  if(crash.CRASH_YEAR>=numericField1&&
    crash.CRASH_YEAR<=numericField2 &&
    crash.POLICE_AGC== stringField &&
    (crash.DRINKING_D==1)==booleanField) {
      myfilter.push(crash);
    }return myfilter})}; //The filter does not seem to work */


var plotData = function() {
  markers=_.each(mydata, function(x){
    L.marker([x.lat_final,x.long_final]).addTo(map).bindPopup(x.DRINKING_D);
  });
  };
  /* =====================
    Fill out this function definition
  ===================== */
