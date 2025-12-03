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

  // Lightbox functionality for gallery items
  var lightbox = document.getElementById("lightbox");
  var lightboxImage = document.getElementById("lightbox-image");
  var lightboxTitle = document.getElementById("lightbox-title");
  var lightboxMeta = document.getElementById("lightbox-meta");
  var lightboxClose = document.getElementById("lightbox-close");
  var galleryItems = document.querySelectorAll(".gallery-item");

  if (lightbox && galleryItems.length) {
    // Open lightbox when clicking a gallery item
    galleryItems.forEach(function (item) {
      item.addEventListener("click", function () {
        var img = item.querySelector("img");
        var title = item.querySelector(".gallery-item__title");
        var meta = item.querySelector(".gallery-item__meta");

        if (img) {
          lightboxImage.src = img.src;
          lightboxImage.alt = img.alt || "";
          lightboxTitle.textContent = title ? title.textContent : "";
          lightboxMeta.textContent = meta ? meta.textContent : "";

          lightbox.classList.add("is-open");
          lightbox.setAttribute("aria-hidden", "false");
          document.body.classList.add("lightbox-open");
        }
      });
    });

    // Close lightbox functions
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
    }

    // Close button
    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    // Close on backdrop click
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  }
});


