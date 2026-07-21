/* =========================================================
   Laxmi Praveena Associates — Site Script
   ========================================================= */

// ---- EDIT YOUR CONTACT DETAILS HERE (used by forms/buttons) ----
const SITE_CONTACT = {
  phone: "+91 90000 00000",           // Replace with real phone number
  phoneDial: "+919000000000",         // Same number, no spaces, for tel: links
  whatsapp: "919000000000",           // Country code + number, no + or spaces
  email: "info@laxmipraveenaassociates.com"
};

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.classList.toggle("open");
    });
    // Mobile dropdown expand
    document.querySelectorAll(".has-dropdown > a").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 860) {
          e.preventDefault();
          link.parentElement.classList.toggle("open");
        }
      });
    });
    // Close nav when a real link is clicked (mobile)
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (window.innerWidth <= 860 && !a.parentElement.classList.contains("has-dropdown")) {
          nav.classList.remove("open");
          toggle.classList.remove("open");
        }
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const q = item.querySelector(".faq-q");
    if (!q) return;
    q.addEventListener("click", function () {
      const wasOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".faq-item").forEach(function (i) {
        i.classList.remove("open");
      });
      if (!wasOpen) item.classList.add("open");
    });
  });

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = "0 6px 20px rgba(10,38,71,0.08)";
      } else {
        header.style.boxShadow = "none";
      }
    });
  }

  /* ---------- Set all click-to-call / WhatsApp links from config ---------- */
  document.querySelectorAll("[data-call-link]").forEach(function (el) {
    el.href = "tel:" + SITE_CONTACT.phoneDial;
  });
  document.querySelectorAll("[data-call-text]").forEach(function (el) {
    el.textContent = SITE_CONTACT.phone;
  });
  document.querySelectorAll("[data-email-link]").forEach(function (el) {
    el.href = "mailto:" + SITE_CONTACT.email;
  });
  document.querySelectorAll("[data-email-text]").forEach(function (el) {
    el.textContent = SITE_CONTACT.email;
  });
  document.querySelectorAll("[data-whatsapp-link]").forEach(function (el) {
    const presetMsg = el.getAttribute("data-whatsapp-link") || "Hello! I would like to know more about Tata AIA Life Insurance plans.";
    el.href = "https://wa.me/" + SITE_CONTACT.whatsapp + "?text=" + encodeURIComponent(presetMsg);
  });

  /* ---------- Lead / consultation forms ----------
     No backend needed: on submit, we open WhatsApp with a
     pre-filled message containing the visitor's details. */
  document.querySelectorAll(".lead-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const phone = (data.get("phone") || "").toString().trim();
      const interest = (data.get("interest") || "General Enquiry").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      if (!name || !phone) {
        alert("Please enter your name and phone number so we can call you back.");
        return;
      }

      let text = "Hello, I would like a free consultation.%0A";
      text += "Name: " + encodeURIComponent(name) + "%0A";
      text += "Phone: " + encodeURIComponent(phone) + "%0A";
      text += "Interested in: " + encodeURIComponent(interest);
      if (message) text += "%0AMessage: " + encodeURIComponent(message);

      const successBox = form.parentElement.querySelector(".form-success");
      if (successBox) successBox.style.display = "block";

      window.open("https://wa.me/" + SITE_CONTACT.whatsapp + "?text=" + text, "_blank");
      form.reset();
    });
  });

});
