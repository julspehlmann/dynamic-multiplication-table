/*
Julia Spehlmann, UMass Lowell Computer Science, julia_spehlmann@student.uml.edu
COMP 4610 GUI Programming I
Assignment 8: Using the jQuery UI Slider and Tab Widgets
Copyright (c) 2018 by Julia Spehlmann. All rights reserved.
Updated by JS on November 30, 2018 at 3:59 PM
File: jquery.validate.js
Description: Validations for multiplication table submit form.
Added minimums and maximums to form input.
*/

//validates all fields are inputted and sends appropriate error message
//validates second input is >= first input
//validates minimum and maximum input
$(document).ready(function() {
  $("form").validate({
    rules: {
      firstStart: {
        required: true,
        min: -100,
        max: 100,
      },
      firstEnd: {
        required: true,
        greaterThanOrEqualTo:"#multiplier-start",
        max: 100,
        min: -100,
      },
      secondStart: {
        required: true,
        min: -100,
        max: 100,
      },
      secondEnd: {
        required: true,
        greaterThanOrEqualTo:"#multiplicand-start",
        max: 100,
        min: -100,
      },
    },
    messages: {
      firstStart: {
        required: "Please enter a multiplier start",
        min: "Please enter a number greater than or equal to -100",
        max: "Please enter a number less than or equal to 100",
      },
      firstEnd: {
        required: "Please enter a multiplier end",
        greaterThanOrEqualTo: "Multiplier end must be greater than or equal to multiplier start",
        max: "Please enter a number less than or equal to 100",
        min: "Please enter a number greater than or equal to -100",
      },
      secondStart: {
        required: "Please enter a multiplcand start",
        min: "Please enter a number greater than or equal to -100",
        max: "Please enter a number less than or equal to 100",
      },
      secondEnd: {
        required:"Please enter a multiplicand end",
        greaterThanOrEqualTo: "Multiplicand end must be greater than or equal to multiplicand start",
        max: "Please enter a number less than or equal to 100",
        min: "Please enter a number greater than or equal to -100",
      },
    },
  });
})

//custom method for checking if second input is greater than first for multiplier and multiplicand
//taken and modified from https://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
$.validator.addMethod("greaterThanOrEqualTo",
    function (value, element, param) {
          var $otherElement = $(param);
          return parseInt(value, 10) >= parseInt($otherElement.val(), 10);
  });
