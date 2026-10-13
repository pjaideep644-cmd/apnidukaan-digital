// WhatsApp business number, international format, digits only.
// Example: 919876543210
const WHATSAPP_NUMBER = "916307343518";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const categorySelect = document.querySelector("#category");
const enquiryForm = document.querySelector("#enquiry-form");
const formNote = document.querySelector("#form-note");
const directWhatsapp = document.querySelector("#direct-whatsapp");
const businessNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

if (directWhatsapp) {
  if (businessNumber) {
    const greeting = encodeURIComponent("Namaste! Mujhe apne business ke liye website banvani hai.");
    directWhatsapp.href = `https://wa.me/${businessNumber}?text=${greeting}`;
    directWhatsapp.target = "_self";
    if (formNote) {
      formNote.textContent = "Form bhejne par WhatsApp khulega. Message bhejne ke liye Send dabayein.";
      formNote.classList.remove("form-note-alert");
    }
  } else {
    directWhatsapp.hidden = true;
  }
}

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    navigation.classList.toggle("is-open", !isExpanded);
    document.body.classList.toggle("menu-open", !isExpanded);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

document.querySelectorAll("[data-category]").forEach((card) => {
  card.addEventListener("click", () => {
    if (!categorySelect) return;
    categorySelect.value = card.dataset.category;
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => document.querySelector("#name")?.focus({ preventScroll: true }), 450);
  });
});

if (enquiryForm && formNote) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(enquiryForm);
    const message = [
      "Namaste! Mujhe apne business ke liye website banvani hai.",
      `Naam: ${data.get("name")}`,
      `Business: ${data.get("business")}`,
      `Category: ${data.get("category")}`,
      `Phone/WhatsApp: ${data.get("phone")}`,
      data.get("details") ? `Website details: ${data.get("details")}` : "",
    ].filter(Boolean).join("\n");

    if (!businessNumber) {
      formNote.textContent = "Request taiyaar hai. WhatsApp par bhejne ke liye script.js mein apna business number add karein.";
      formNote.classList.add("form-note-alert");
      return;
    }

    const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
    formNote.textContent = "WhatsApp khol rahe hain. Message bhejne ke liye Send dabayein.";
    formNote.classList.remove("form-note-alert");
    window.location.assign(whatsappUrl);
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
