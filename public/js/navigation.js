// Shared functions for navigation areas

// Log Out button
$(document).on("click", ".logout", function() {
  sessionStorage.clear();
  window.location.href = "/";
});