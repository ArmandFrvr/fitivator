
$(document).ready(function() {


  // Stupid stub function that puts a user in the db based on username
  // Tyler-- replace this with amazon login code stuffs
  $("#sign-up").on("click", function() {

    event.preventDefault();
    sessionStorage.clear();

    var user = $("#username").val().replace(/[^a-zA-Z0-9]+/g, '');
    var password = $("#password").val();

    $.get("/api/users/" + user, function(data) {
      alert("password is: " + password);

      // If user doesn't exist, add them to the db (just username and email for now)
      if(!data) {
        console.log("User not found");
        let email = $("#email").val().replace(/[^a-zA-Z@.-0-9]+/g, '');
        addUser(user, email, password);
      }
      else {
        // Log the user in
        console.log("Logging user in: " + user);
        sessionStorage.setItem("username", user);
        // take existing user to their dashboard
        window.location.href = "/dashboard";
      }
    });
  });



});



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