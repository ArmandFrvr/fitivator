
$(document).ready(function() {


  // Stupid stub function that puts a user in the db based on first name
  // Tyler-- replace this with amazon login code stuffs
  $("#sign-up").on("click", function() {

    event.preventDefault();
    sessionStorage.clear();

    var user = $("#username").val().replace(/[^a-zA-Z0-9]+/g, '');
    var tryUser = getUser(user);

    // If user doesn't exist, add them to the db (just username and email for now)
    if(!tryUser) {
      console.log("User not found");
      let email = $("#email").val().replace(/[^a-zA-Z@.-0-9]+/g, '');
      console.log("Email is: " + email);
      addUser(user, email);
      sessionStorage.setItem("username", user);
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


// Gets user from db
function getUser(username) {

  $.get("/api/users/" + username, function(data) {
    console.log("data is: " + data);
    return(data);

  });
}

// Adds user to db
function addUser(username, email) {

  // Construct a new user object to send to the db
  let newUser = {
    username: username,
    email: email
    // externalID: externalID
  }
  console.log("Creating user: " + newUser);
  $.post("/api/users/", newUser, function() {
    // Once the user is created, take them to their profile page
    // so they can fill it out.
    window.location.href = "/profile";
  });

}