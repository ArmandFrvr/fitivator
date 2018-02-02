$(document).ready(function() {

  $("#add-workout").on("click", function() {

    let workoutDiv = '<div class="row workout-row"><div class="col-md-3">'
                      + '<div class="md-form form-sm">'
                      + '<select class="form-control" aria-labelledby="day">'
                      + '<option value="sun">Sunday</option>'
                      + '<option value="mon">Monday</option>'
                      + '<option value="tues">Tuesday</option>'
                      + '<option value="wed">Wednesday</option>'
                      + '<option value="thurs">Thursday</option>'
                      + '<option value="fri">Friday</option>'
                      + '<option value="sat">Saturday</option>'
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


});

// When the value of a workout day or time changes
$(document).on("click", "#workout-days select, #workout-days input", function() {

  // Update the value of that workout day and time entry in the database

});

$(document).on("click", ".remove-workout", function() {
  // Need to remove from the db before we remove from the dom since we'll need the data id


  // Remove from DOM
  $(this).closest(".workout-row").remove();
});


