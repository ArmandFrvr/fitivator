
// List of days so we can support multiple time zones
var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

$(document).ready(function() {

  // Button to add additional workout days
  $("#add-workout").on("click", function() {

    let workoutDiv = '<div class="row workout-row"><div class="col-md-3">'
                      + '<div class="md-form form-sm">'
                      + '<select class="form-control" aria-labelledby="day">'
                      + '<option value="Sunday">Sunday</option>'
                      + '<option value="Monday">Monday</option>'
                      + '<option value="Tuesday">Tuesday</option>'
                      + '<option value="Wednesday">Wednesday</option>'
                      + '<option value="Thursday">Thursday</option>'
                      + '<option value="Friday">Friday</option>'
                      + '<option value="Saturday">Saturday</option>'
                      + '</select></div></div>'
                      + '<div class="col-md-3"><div class="md-form form-sm">'
                      + '<i class="fa fa-clock-o prefix"></i>'
                      + '<input type="time" id="time-1" class="form-control"></div></div>'
                      + '<div class="col-md-1"><div class="md-form form-sm">'
                      + '<button class="remove-workout icon-btn" aria-label="Remove Workout">'
                      + '<i class="fa fa-times-circle-o"></i></button></div></div>';
                      // Need to use right id (use data not id)
                      // Put data element on both day and time so we can use it in the on change

    $("#workout-btn-row").before(workoutDiv);
  });

// Checkbox to show/hide workout buddy section
  $("#call-want").on("change", function() {

    if($(this).prop("checked")) {
      $("#call-want-section").slideDown(500);
      $("#call-want-section").show();
    }
    else {
      $("#call-want-section").hide();
    }
  });


  // Checkbox to sign up to make calls
  $("#call-want").on("change", function() {

    if($(this).prop("checked")) {
      $("#call-want-section").slideDown(500);
      $("#call-want-section").show();
    }
    else {
      $("#call-want-section").hide();
    }
  });


});

// When the value of a workout day changes
$(document).on("change", "#workout-days select", function() {

});


// When the value of a workout time changes
$(document).on("change", "#workout-days input", function() {

  // Update the value of that workout day and time entry in the database
  // CODE GOES HERE

  // Grab the values of the day and time
  // Store them to a new LocalDate
  let time = moment("2018-06-15T" + $(this).val());

});

// Remove workout button(s)
$(document).on("click", ".remove-workout", function() {
  // Need to remove from the db before we remove from the dom since we'll need the data id
  // CODE GOES HERE

  // Remove from DOM
  $(this).closest(".workout-row").remove();
});


