
// List of days so we can support multiple time zones
var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var currentUser;
var currentUserID;

// If user isn't logged in, redirect them to the login screen.
// CODE GOES HERE


// Get the user's ID
// CODE GOES HERE


// Select all of the user's info from the db so we have it to hand
// CODE GOES HERE
// currentUser = selectOne * from users where user.externalID = currentUserID
// currentUser should be a JSON object so we can reference the user fields.



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
  $("#call-make").on("change", function() {

    if($(this).prop("checked")) {
      $("#call-make-section").slideDown(500);
      $("#call-make-section").show();
    }
    else {
      $("#call-make-section").hide();
    }
  });


  // Button to find workout partner
  $("#find-partner").on("click", function() {

    // CODE GOES HERE TO FIND MATCH

    // first check to see if they already have a partner
    if(currentUser.matchedUser) {
      // This isn't falsy, so they already have a match
      // Let them know they're currently matched with user xyz
      // Need to selectOne from users where user.id = currentUser.matchedUser
      let theirMatch; // = CODE GOES HERE to select them

      // for now
      alert("You are already matched with " + theirMatch.Firstname);
      // Make some nice UI here where they can choose someone else if their match sucks

    }
    else {
      // They don't have a match, so find them one
      let matchString = user.matchQuestions;

      // let unmatchedUsers =
      // Select all users from db who don't have a matched user
      // select * from users where user.matchedUser is null

      // for each user in the unmatchedUsers array, check how good of a match they are
      // similar algorithm to friendFinder

      // Array of objects in the format
      // {
      //    id
      //    score
      // }
      var topThree = [];

      // https://stackoverflow.com/questions/4956593/optimal-algorithm-for-returning-top-k-values-from-an-array-of-length-n
      for(let i = 0; i < unmatchedUsers.length; i++) {




      }

      // bestUser should

    }


  })


});

// When the value of a workout day changes
$(document).on("change", "#workout-days select", function() {
  // CODE GOES HERE

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




// Get the username of the currently logged-in user
function getUser() {
  // CODE GOES HERE


  // return actual username (currently a string)
  return "12345";
}