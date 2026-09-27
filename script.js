const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

document.getElementById("year").textContent = new Date().getFullYear();

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/*
  IMPORTANT:
  Paste your deployed Google Apps Script Web App URL below.
  Example:
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/XXXXX/exec";
*/
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxoRapASFcnrXHESWOe6wfIRnujjUmkiK7xcIvlO2GLobm3-dSwnb0wCWFBIGPOUNLP/exec";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")) {
    statusText.textContent = "Contact form setup is not connected yet. Add the Google Apps Script URL in script.js.";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  statusText.textContent = "";

  const data = new FormData(form);

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: data
    });

    form.reset();
    statusText.textContent = "Thank you! Your message has been sent.";
  } catch (error) {
    statusText.textContent = "Something went wrong. Please try again or email me directly.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});
