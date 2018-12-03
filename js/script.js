/*
Julia Spehlmann, UMass Lowell Computer Science, julia_spehlmann@student.uml.edu
COMP 4610 GUI Programming I
Assignment 8: Using the jQuery UI Slider and Tab Widgets
Copyright (c) 2018 by Julia Spehlmann. All rights reserved.
Updated by JS on November 30, 2018 at 11:18 AM
File: script.js
Description: An extension of Assignment 7 with the addition of jQuery slider and tab widgets
Multiplication Table now dynamically changes with input.
The ability to save tables was added.
*/

function startMultTable(){
  //parseInt converts string input to int
  var multiplierStart = parseInt(document.getElementById("multiplier-start").value, 10);
  var multiplierEnd = parseInt(document.getElementById("multiplier-end").value, 10);
  var multiplicandStart = parseInt(document.getElementById("multiplicand-start").value, 10);
  var multiplicandEnd = parseInt(document.getElementById("multiplicand-end").value, 10);

  if($("form").valid()){
    createTable(multiplierStart, multiplierEnd, multiplicandStart, multiplicandEnd);
  }
  return false;
};

//creates the table
function createTable(multiplierStart, multiplierEnd, multiplicandStart, multiplicandEnd){
  //remove any existing table
  if(document.getElementsByTagName("table").length > 0) {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("mult-table"))
  }
  //logging values to check for correctness
  console.log("multiplier start: ", multiplierStart);
  console.log("multiplier end: ", multiplierEnd);
  console.log("multiplicand start: ", multiplicandStart);
  console.log("multiplicand end: ", multiplicandEnd);

  //createw new table
  var numCols = multiplierEnd - multiplierStart;
  var numRows = multiplicandEnd - multiplicandStart;
  var body = document.getElementsByTagName("body")[0];
  var tableEl = document.createElement("table");
  tableEl.setAttribute("class", "table");
  var tableBody = document.createElement("tbody");
  tableEl.appendChild(tableBody);

  for(var i = 0; i <= numRows + 1; i++){
    var row = document.createElement("tr");
    tableBody.appendChild(row);
    //make header for multiplier
    if(!i){
      for(var j = 0; j <= numCols + 1; j++) {
        var colHeader = document.createElement("th");
        row.appendChild(colHeader);
        if(j){
          var headertext = document.createTextNode(multiplierStart + (j-1));
          colHeader.appendChild(headertext);
        }
      }
    } else {
        for(var k = 0; k <= numCols + 1; k++){
          //make header for multiplicand
          if(!k){
            var rowHeader = document.createElement("th");
            row.appendChild(rowHeader);
            var headertext = document.createTextNode(multiplicandStart + (i-1));
            rowHeader.appendChild(headertext);
          } else {
              var col = document.createElement("td");
              row.appendChild(col);
              //the data inside the table
              var tableData = document.createTextNode(((i-1)+multiplicandStart) * (multiplierStart + (k-1)));
              col.appendChild(tableData);
          }
        }
    }
  }
  tableEl.id = "mult-table";
  body.appendChild(tableEl);
}


//slider implementation
$( function() {
    //initialize first slider
    $( "#first-slider" ).slider({
       min:-100,
       max:100,
       value: 0,
       animate: "slow",
       slide: function( event, ui ) {
          $( "#multiplier-start" ).val( ui.value );
          $("form").submit();
       },
    });

    //updates input elements as slider changes
    $( "#multiplier-start" ).val( $( "#first-slider" ).slider( "value" ) );

    //binds chnage event in slider to the input element of the form by calling
    //slider's value method
    //modified code from: https://stackoverflow.com/questions/7523864/ui-slider-with-text-box-input
    $("#multiplier-start").change(function () {
      var value = this.value;
      $("#first-slider").slider("value", parseInt(value, 10));
      $("form").submit();
    });

    //initialize second slider
    $( "#second-slider" ).slider({
       min: -100,
       max:100,
       value: 0,
       animate: "slow",
       slide: function( event, ui ) {
          $( "#multiplier-end" ).val( ui.value );
          $("form").submit();
       }
    });

    //updates input elements as slider changes
    $( "#multiplier-end" ).val( $( "#second-slider" ).slider( "value" ) );

    //binds chnage event in slider to the input element of the form by calling
    //slider's value method
    //modified code from: https://stackoverflow.com/questions/7523864/ui-slider-with-text-box-input
    $("#multiplier-end").change(function () {
      var value = this.value;
      $("#second-slider").slider("value", parseInt(value, 10));
      $("form").submit();
    });

    //initialize third slider
    $( "#third-slider" ).slider({
       min:-100,
       max:100,
       value: 0,
       animate: "slow",
       slide: function( event, ui ) {
          $( "#multiplicand-start" ).val( ui.value );
          $("form").submit();
       }
    });

    //updates input elements as slider changes
    $( "#multiplicand-start" ).val( $( "#third-slider" ).slider( "value" ) );

    //binds chnage event in slider to the input element of the form by calling
    //slider's value method
    //modified code from: https://stackoverflow.com/questions/7523864/ui-slider-with-text-box-input
    $("#multiplicand-start").change(function () {
      var value = this.value;
      $("#third-slider").slider("value", parseInt(value, 10));
      $("form").submit();
    });

    //initialize fourth slider
    $( "#fourth-slider" ).slider({
       min:-100,
       max:100,
       value: 0,
       animate: "slow",
       slide: function( event, ui ) {
          $( "#multiplicand-end" ).val( ui.value );
          $("form").submit();
       }
    });

    //updates input elements as slider changes
    $( "#multiplicand-end" ).val( $( "#fourth-slider" ).slider( "value" ) );

    //binds chnage event in slider to the input element of the form by calling
    //slider's value method
    //modified code from: https://stackoverflow.com/questions/7523864/ui-slider-with-text-box-input
    $("#multiplicand-end").change(function () {
      var value = this.value;
      $("#fourth-slider").slider("value", parseInt(value, 10));
      $("form").submit();
    });
});


//tab implementation
//modified from https://stackoverflow.com/questions/14702631/in-jquery-ui-1-9-how-do-you-create-new-tabs-dynamically
//creates a new tab when button is clicked
$( function() {

  $("div#tabs").tabs();

  //adds tabs when save my table btn is clicked
  $("button#add-tab").click(function() {
    //makes sure valid table is made
    $("form").submit();

    if($("form").valid()){
      var multiplierStart = parseInt(document.getElementById("multiplier-start").value, 10);
      var multiplierEnd = parseInt(document.getElementById("multiplier-end").value, 10);
      var multiplicandStart = parseInt(document.getElementById("multiplicand-start").value, 10);
      var multiplicandEnd = parseInt(document.getElementById("multiplicand-end").value, 10);

      var num_tabs = $("div#tabs ul li").length + 1;

      //can only save up to 10 tabs
      if(num_tabs > 10) {
        alert("Sorry, I can only save 10 tables. Please remove a table before adding a new one.");
        return false;
      } else {
        //create tabs
        $("div#tabs ul").append(
            "<li><a href='#tab" + num_tabs + "'>"+ multiplierStart + " to " + multiplierEnd + " X " + multiplicandStart + " to " + multiplicandEnd + "</a>" + "<span class='ui-icon ui-icon-close' role='presentation'></span></li>"
          );
        $("div#tabs").append(
            "<table id='tab" + num_tabs + "'>" + document.getElementById("mult-table").innerHTML + "</table>"
          );
          //show tab
        $("div#tabs").tabs("refresh");
        //activate tab
        $( "#tabs" ).tabs("option", "active", -1);
      }
    }
    } );

  // code for removing tab when x icon is clicked
  //modified code from http://jqueryui.com/tabs/#manipulation
  $( "#tabs" ).delegate( "span.ui-icon-close", "click", function() {
      var panelID = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      console.log(panelID);
      $( "#" + panelID ).remove();
      $("div#tabs").tabs("refresh");
    });
} );
