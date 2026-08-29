document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  var page = document.body;
  var lightbox = document.getElementById("lightbox");
  var lightboxImage = document.getElementById("lightboxImage");
  var closeBtn = document.getElementById("lightboxClose");

  function openImage(src, alt) {
    if (!lightbox || !lightboxImage || !src) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt || "Memory photo";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    page.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    page.style.overflow = "";
  }

  // Handles every image button, including photos inside date-wise timeline entries.
  page.addEventListener("click", function (event) {
    var button = event.target.closest(".memory-photo, .photo-card");
    if (!button) return;

    var src = button.getAttribute("data-full");
    var img = button.querySelector("img");
    if (src) openImage(src, img ? img.alt : "Memory photo");
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLightbox();
  });

  // Gently bring an opened date into view.
  document.querySelectorAll(".timeline-item").forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        window.setTimeout(function () {
          item.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 80);
      }
    });
  });
});
