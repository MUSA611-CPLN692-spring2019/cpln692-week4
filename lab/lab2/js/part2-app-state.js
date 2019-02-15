/* =====================
  Lab 2, part 2 - application state

  Spatial applications aren't typically as simple as putting data on a map. In
  addition, you'll usually need to change the stored data in response to user
  input. This lab walks you through writing a set of functions that are capable
  of building an interactive application.

  First, we'll need to write a function for loading points onto the map. Choose
  any dataset from part1 and write a function here to download it, parse it,
  make it into markers, and plot it. You'll know you've succeeded when you can
  see markers on the map.

  NOTE 1: When we have added markers to the map in the past, we have used a line like:

       L.marker([50.5, 30.5]).addTo(map);

       This is accomplishing two goals. L.marker([50.5, 30.5]) makes a marker
       and .addTo(map) adds that marker to the map. This task differs in that,
       you are being asked to create separate functions: one to create markers
       and one to add them to the map. This is an important step if we want to
       refer to plotted markers later (to delete them from the map, for instance).

  (IMPORTANT!)
  NOTE 2: These functions are being called for you. Look to the bottom of this file
       to see where and how the functions you are defining will be used. Remember
       that function calls (e.g. func();) which are equal to a value (i.e. you
       can set a var to it: var result = func();) must use the 'return' keyword.

       var justOne = function() {
         return 1;
       }
       var one = justOne();
===================== */

//Copy and pasted the URL from part 1 to here just to make sure part 2 will read them as well:
var phillySolarInstallationDataUrl = "https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json";

// We set this to HTTP to prevent 'CORS' issues
var downloadData = $.ajax(phillySolarInstallationDataUrl).done(function(ajaxResponseValue) { //Extracts the data from the phillySolarInstallationDataUrl. Since that URL is a variable, the phillySolarInstallationDataUrl vairalbe name is used in place of the URL.


var parseData = _.map(JSON.parse(ajaxResponseValue), function(obj) { //_.map applies this function to the parsed data (represented by the nested "JSON.parse(ajaxResponseValue)") which extracts the lat, lon and name characteristics of all the solar installations in the parsed data ("JSON.parse(ajaxResponseValue)")
  return _.pick(obj, 'Y', 'X', 'NAME'); //_.pick extracts those characteristics to be displayed on the web map. 'Y' is coming first before 'X' just as an added way to remember the proper listing order of the coordinates when mapping 
});
for (var i=0; i <parseData.length; i = i+1) { //This loops through the parsed data and prints all of the solar installation point information extracted above to the console to make sure the process above worked.
    console.log(parseData[i])
    }


var makeMarkers = function(obj) { //This function serves as a tool which a marker is made out of the coordinates and popup made out of the name of each solar installation
    return L.marker([obj.Y, obj.X]).bindPopup(obj.NAME)
};
for (var i=0; i <parseData.length; i = i+1) { //This loop statement applies the make markers function created above to all solar installations (the parsed data) by looping through that data and making the markers for each of them
      makeMarkers(parseData[i])
      }


var plotMarkers = function(obj) { //This function simply adds the markers made above to the map
    return makeMarkers(parseData[i]).addTo(map)
};

}); //THIS CLOSES OUT THE ( and { IN ".done(function(ajaxResponseValue) {" WHERE THE downloadData VARIABLE IS CREATED


/* =====================
  Define the function removeData so that it clears the markers you've written
  from the map. You'll know you've succeeded when the markers that were
  previously displayed are immediately removed from the map.

  In Leaflet, the syntax for removing one specific marker looks like this:

  map.removeLayer(marker);

  In real applications, this will typically happen in response to changes to the
  user's input.
===================== */

 var removeMarkers = function() { //This function undoes the marker adding process above so that it just prints the base map without any markers. The variable 'markers' that contains the markers map layer is actually created in the downloadData.done(function(data) {} function at the very bottom of this code
  map.removeLayer(markers);
};

/* =====================
  Optional, stretch goal
  Write the necessary code (however you can) to plot a filtered down version of
  the downloaded and parsed data.

  Note: You can add or remove from the code at the bottom of this file.
===================== */

/* =====================
 Leaflet setup - feel free to ignore this
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
 CODE EXECUTED HERE!
===================== */

 downloadData.done(function(data) {
  var parsed = parseData(data); //Parses the data
  var markers = makeMarkers(parsed); //Where the variable 'markers' that contains the markers map layer is actually created
  plotMarkers(markers); //First plots the markers, but then...
  removeMarkers(markers); //...removes the markers after they were created so that just the Philadelphia base map shows
});
