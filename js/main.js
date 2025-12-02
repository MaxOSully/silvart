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

  // Interactive gallery menu (gallery page only)
  var galleryMenu = document.querySelector("[data-gallery-menu]");
  var gallerySections = document.querySelectorAll("[data-gallery-section]");
  var galleryButtons = document.querySelectorAll("[data-gallery-target]");
  var backButtons = document.querySelectorAll("[data-gallery-back]");

  if (galleryMenu && gallerySections.length && galleryButtons.length) {
    var sectionMap = {};
    gallerySections.forEach(function (section) {
      var key = section.getAttribute("data-gallery-section");
      sectionMap[key] = section;
    });

    galleryButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var targetId = button.getAttribute("data-gallery-target");
        showSection(targetId);
      });
    });

    backButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        showMenu();
      });
    });

    function showSection(id) {
      var targetSection = sectionMap[id];
      if (!targetSection) {
        return;
      }

      galleryMenu.classList.add("is-hidden");
      gallerySections.forEach(function (section) {
        var isMatch = section === targetSection;
        section.classList.toggle("is-hidden", !isMatch);
        section.setAttribute("aria-hidden", isMatch ? "false" : "true");
      });

      galleryButtons.forEach(function (button) {
        var isActive = button.getAttribute("data-gallery-target") === id;
        button.classList.toggle("is-active", isActive);
      });

      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function showMenu() {
      galleryMenu.classList.remove("is-hidden");
      gallerySections.forEach(function (section) {
        section.classList.add("is-hidden");
        section.setAttribute("aria-hidden", "true");
      });

      galleryButtons.forEach(function (button) {
        button.classList.remove("is-active");
      });

      galleryMenu.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});


