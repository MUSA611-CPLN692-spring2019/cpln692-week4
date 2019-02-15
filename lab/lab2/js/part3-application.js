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

var phillyCrimeDataUrl = "https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-crime-snippet.json";

var currently_plotted_markers = [];
var currently_selected_data = [];
var complete_data = [];

/* =====================
  Define a resetMap function to remove markers from the map and clear the array of markers
===================== */
var resetMap = function(currently_plotted_markers) {
  /* =====================
    Fill out this function definition
  ===================== */
  currently_selected_data = complete_data;
  _.each(currently_plotted_markers, function(i) {return map.removeLayer(i);});
};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var getAndParseData = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  $.ajax(phillyCrimeDataUrl).done(function(ajaxResponseValue){
    // array of objects into json
    complete_data = JSON.parse(ajaxResponseValue);
      // for(var i = 0; i < complete_data.length; i++){
      //   console.log(complete_data[i]);
      // }

    //make markers and map function to all points and add to map
    // var makeMarkers = (i) => {return L.marker([i.Y,i.X]).bindPopup(i.NAME).addTo(map);};
    // var allMarkers = _.map(computedValue, makeMarkers);

  });
};

/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */
var plotData = function() {
  /* =====================
    data:
      numericField1
      numericField2
      booleanField
      stringField
  ===================== */
  
  // console.log(currently_selected_data[0]["Dispatch Date/Time"].substring(20,22)==="PM");
  if(numericField1 != '' && numericField2 != ''){
    currently_selected_data = _.filter(currently_selected_data, function(val) {
      var cur_time = val["Dispatch Date/Time"];
      var cur_hour = parseInt(cur_time.substring(11,13));
      var ampm = cur_time.substring(20,22);
      if(ampm === "PM"){
        cur_hour += 12;
      }

      var cur_t = new Date('December 17, 1995 00:00:00');
      cur_t.setHours(cur_hour,parseInt(cur_time.substring(14,16)),parseInt(cur_time.substring(17,19)));

      var n1_t = new Date('December 17, 1995 00:00:00');
      n1_t.setHours(numericField1);

      var n2_t = new Date('December 17, 1995 00:00:00');
      n2_t.setHours(numericField2);

      if((cur_t >= n1_t && cur_t <= n2_t)){
        return true;
      } else {
        return false;
      }
    });
  }

  if(stringField != ''){
    currently_selected_data = _.filter(currently_selected_data, function(val) {
      return (val["General Crime Category"] == stringField);
    });
  }

  if(booleanField == true){
      currently_selected_data=_.filter(currently_selected_data,function(val){
        var crime_location = val["Location Block"];
        var south_broad_st = "S BROAD ST";
        var oregon_av = "OREGON AV";
        var oregon_ave = "OREGON AVE";
        if (crime_location.includes(south_broad_st) | crime_location.includes(oregon_av) | crime_location.includes(oregon_ave)){
          console.log(crime_location);
          return true;
        } else {
          return false;
        }
      });
    }

  var makeMarkers = (i) => {return L.marker([i.Lat,i.Lng]).bindPopup(i["Location Block"]).addTo(map);};
  var currently_plotted_markers = _.map(currently_selected_data, makeMarkers);


  return currently_plotted_markers;
};
