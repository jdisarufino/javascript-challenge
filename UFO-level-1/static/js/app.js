
// import UFO data from data.js
var tableData = data;
// tableData.forEach(function(sighting){
//   console.log(sighting)});

// where to inject UFO data in HTML
var tableSelection = d3.select("#ufo-table");
// console.log(tableSelection); //print preivew element selection

// define action elements
var theButton = d3.select("#filter-btn");
var inputField = d3.select("#datetime");

// FORM AND BUTTON EVENT LISTENING
// ###########################################################

// ACTION: ON LOAD - CREATE INITIAL TABLE ######
window.onload = (function() {
  tableData.forEach(function(sighting){
    // create table rows
    var newRow = tableSelection.append("tr");
    // input sightings into cells
    Object.entries(sighting).forEach(function([key,value]){
      var newCell = newRow.append("td").text(value);
    });
  });
});

// ACTION: ON CLICK - FILTER & REPLACE TABLE ######
theButton.on("click", function() {
  //user date input
  var inputValue = inputField.property("value");
  // console.log(inputValue);

  // turn user date string into date object
  function dateParse(dateString) {
    return Date.parse(dateString);
  };
  var parsedDate = dateParse(inputValue);
  // console.log(parsedDate);

  // filter dates greater than or equal to parsedDate from tableData
  function filterValue(date) {
    return Date.parse(date.datetime) >= parsedDate;
  };
  var filterTable = tableData.filter(filterValue);
  
  // replace existing table with new blank table
  document.getElementById("ufo-table").innerHTML =
  `<thead>
    <tr>
      <th class="table-head">Date</th>
      <th class="table-head">City</th>
      <th class="table-head">State</th>
      <th class="table-head">Country</th>
      <th class="table-head">Shape</th>
      <th class="table-head">Duration</th>
      <th class="table-head">Comments</th>
    </tr>
  </thead>`
  
  // take the new filterTable array and insert to HTML
  filterTable.forEach(function(filterSighting) {
    var newFilterRow = tableSelection.append("tr");
    Object.entries(filterSighting).forEach(function([key,value]){
    var newFilterCell = newFilterRow.append("td").text(value);
    });
  });
});

// Aliens are real. Have a great day!
