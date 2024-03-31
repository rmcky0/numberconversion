
const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  modeText = body.querySelector(".mode-text");
  
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

document.addEventListener("DOMContentLoaded", function() {
  // Get the current page's filename
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/') + 1);

  // Get all navigation links
  var navLinks = document.querySelectorAll('.nav-link a');

  // Loop through each navigation link
  navLinks.forEach(function(navLink) {
    // Get the href attribute of the navigation link
    var href = navLink.getAttribute('href');

    // If the href attribute matches the current page's filename
    if (filename === href) {
      // Add the active class to the parent list item
      navLink.parentElement.classList.add('active');
    }
  });
});

