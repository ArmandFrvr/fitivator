$(document).ready(function() {

  $("#add-workout").on("click", function() {

    let workoutDiv = '<div class="col-md-3"><div class="col-md-3"><div class="md-form form-sm">'
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
                      + '<input type="time" id="time-1" class="form-control"></div></div>';
                      // Need to use right id (use data not id)
                      // Put data element on both day and time so we can use it in the on change

    $("#workout-days").append(workoutDiv);


  });


});

// When the value of a workout day or time changes
$("#workout-days select, #workout-days input").on("change", function() {

  // Update the value of that workout day and time entry in the database

});





