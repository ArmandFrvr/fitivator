
$(document).ready(function() {

  // Basic login stuff
  // Tyler-- replace this with Amazon login code (or add)
  $("#sign-up").on("click", function() {

    event.preventDefault();
    sessionStorage.clear();

    var user = $("#username").val().replace(/[^a-zA-Z0-9]+/g, '');
    var email = $("#email").val().replace(/[^a-zA-Z@.-0-9]+/g, '');
    var password = $("#password").val();

    $.get("/api/users/" + user, function(data) {

      // If user doesn't exist, add them to the db
      if(!data) {
        addUser(user, email, password);
      }
      else {
        alert("User " + user + " already exists.");
        showLogin();
      }
    });
  });

  // Go to login screen
  $("#log-in").on("click", function() {
    showLogin();
  });

  // Go to register screen
  $("#sign-up2").on("click", function() {
    showRegister();
  });

  // Click Log In button on login screen
  $("#log-in2").on("click", function() {

    event.preventDefault();
    sessionStorage.clear();

    var user = $("#username2").val().replace(/[^a-zA-Z0-9]+/g, '');
    var password = $("#password2").val();

    $.get("/api/users/" + user, function(data) {

      // If user doesn't exist
      if(!data) {
        alert("User " + user + " does not exist.");
      }
      else if(password != data.password) { // password doesn't match
        // how tf do we do this without making the password visible in the api
        alert("Incorrect password.");
      }
      else {
        // Log the user in
        sessionStorage.setItem("username", user);
        // take existing user to their dashboard
        window.location.href = "/dashboard";
      }
    });
  });
});


function showLogin() {
  $("#register").hide();
  $("#login").show();
}

function showRegister() {
  $("#login").hide();
  $("#register").show();
}


// Adds user to db
function addUser(username, email, password) {

  // Construct a new user object to send to the db
  let newUser = {
    username: username,
    email: email,
    password: password
    // externalID: externalID
  }
  console.log("Creating user: " + newUser);
  $.post("/api/users/", newUser, function() {
    // Once the user is created, log them in and take them to their profile page
    // so they can fill it out.
    sessionStorage.setItem("username", username);
    window.location.href = "/profile";
  });
}