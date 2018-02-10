
// List of days so we can support multiple time zones
var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var currentUser = sessionStorage.getItem("username");

// If user isn't logged in, redirect them to the login screen.
if(!currentUser) {
  window.location.href = "/";
}

var user;

$.get("/api/users/" + currentUser, function(data) {

  if(!data) { // User not found, maybe session data is bad or db changed
    window.location.href = "/";
  }
  else {  // we found our user

    // store to var for later use
    user = data;

    // Once doc is loaded, fill it out with info we just grabbed
    $(document).ready(function() {
      $("#firstName").val(user.firstName);
      fixFieldState("#firstName");
      $("#lastName").val(user.lastName);
      fixFieldState("#lastName");
      $("#uname").val(user.username);
      fixFieldState("#uname");
      $("#email").val(user.email);
      fixFieldState("#email");
      $("#team").val(user.team);
      fixFieldState("#team");
      $("#aboutMe").val(user.aboutMe);
      fixFieldState("#aboutMe");
      $("#wantsCalls").prop("checked", user.wantsCalls);
      $("#makesCalls").prop("checked", user.makesCalls);
      $("#phone").val(user.phone);
      fixFieldState("#phone");

      // If this was enabled, show their workouts
      if(user.wantsCalls) {
        $("#wantsCalls-section").slideDown(500);
        $("#wantsCalls-section").show();
      }


      // need to loop through user.Workouts array and add a workout section
      // for each existing entry, populating them with the correct days and times

    });
  }
});


$(document).ready(function() {

  // Once we have an opacity mask, we need to hide it here.
  // (mask prevents users from seeing content if they're just going
  // to get redirected for not being logged in)

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

  // Button to find workout partner.  Was find-partner
  $("#viewMatches").on("click", function() {

    // CODE GOES HERE TO FIND MATCH

    // first check to see if they already have a partner
    if(currentUser.matchedUserId) {
      // This isn't falsy, so they already have a match
      // Let them know they're currently matched with user xyz
      // Need to selectOne from users where user.id = currentUser.matchedUser
      let theirMatch; // = CODE GOES HERE to select them

      // for now
      alert("Warning: you are already matched with someone.");
      // Make some nice UI here where they can choose someone else if their match sucks

    }
    else {
      // They don't have a match, so find them one
      // let matchString = user.matchQuestions;

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
      // for(let i = 0; i < unmatchedUsers.length; i++) {

      // }

      // bestUser should

    }

   // Last step is to hide the questions and show the results div
    $("#matchQsDiv").hide();
    $("#resultsDiv").show();
    $("#back").show();

  });

  // Button to go back to previous screen (quiz)
  $("#back").on("click", function() {
    $("#resultsDiv").hide();
    $("#back").hide();
    $("#matchQsDiv").show();
  });



}); // END DOCUMENT READY

// Buttons to pick Motivation Partner #1, 2, or 3
$(document).on("click", ".pick", function() {
  // Pull the # out of the button id
  let num = $(this).attr("id").substring(4,5);
  let partnerName = $("#m" + num + "name").text();
  alert("Selecting Motivator #" + num + ".  We'll notify them that you've "
   + "chosen them as your motivation partner.  If it's a match, you'll be "
   + "hearing from us!");
  // Grab the (ID?  Username?  Going to hide it in the DOM somewhere so
  // we can grab it and make some API calls.)  Technically we don't want
  // to link them yet, because it should kick off a notification that goes
  // to the motivator for them to accept the request.  That part isn't written
  // yet though.  :)

  // Maybe we need to add another db field for potential matches that
  // aren't confirmed yet...  I'd like to show this info on the profile page,
  // that there's a match pending.

  //For now:
  $("#find-partner").prop("disabled", true);
  $("#find-partner").after("<i> Awaiting confirmation from " + partnerName + ".</i>");
  $("#close").trigger("click");
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


// Profile field changes - update database
$(document).on("change", ".profile-field", function() {
  let newInfo = {};
  newInfo[$(this).attr("id")] = $(this).val();
  updateUser(newInfo);
});

// Checkbox state changes.  Since checkbox values update immediately,
// we can do both the UI stuff and db update in one fxn.
// (Doesn't work for input fields that don't update until they lose focus)
$(document).on("change", ".profile-checkbox", function() {
  let boxId = $(this).attr("id");

  // Update the database
  let newInfo = {};
  newInfo[boxId] = $(this).prop("checked");
  updateUser(newInfo);

  // Update the UI (expand or collapse the section)
  if($("#" + boxId).prop("checked")) {
    $("#" + boxId + "-section").slideDown(500);   // aaaaand, this is where having good
    $("#" + boxId + "-section").show();           // naming conventions pays off
  }
  else {
    $("#" + boxId + "-section").hide();
  }
});

// Updates the current user with the new information
function updateUser(newInfo) {
  $.ajax({ // TIL "$.put" shortcut doesn't exist.  Anyone know why??
    method: "PUT",
    url: "/api/users/" + currentUser,
    data: newInfo
  })
  .then(function() {
    // show "updated" indicator
    $("#saved").slideDown(500);
    $("#saved").show();
    // After 2 seconds, saved indicator disappears
    setTimeout(function() {
      $("#saved").fadeOut(500);
    }, 2000);
  });
}

// MDB workaround for prefilled field labels
function fixFieldState(inputField) {
    $(inputField).trigger("focusin");
    $(inputField).trigger("blur");
}