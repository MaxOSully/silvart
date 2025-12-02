// Minimal JavaScript for the Silvart site.
// - Handles mobile navigation toggle
// - Sets the current year in the footer
// No external libraries or frameworks are used.

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var navToggle = document.querySelector(".nav-toggle");
  var root = document.documentElement;

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = root.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Dynamic year in the footer
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});


