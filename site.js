"use strict";
document.getElementById("year").textContent = new Date().getFullYear();
const button = document.getElementById("show-calendar");
const calendar = document.getElementById("booking-calendar");
const status = document.getElementById("calendar-status");
const bookingLink = document.getElementById("booking-link");
const configured = window.ANNA_SITE?.bookingUrl;
let bookingUrl = bookingLink.href;
try { const parsed = new URL(configured); if (parsed.protocol === "https:" && parsed.hostname === "calendly.com") bookingUrl = parsed.href; } catch {}
bookingLink.href = bookingUrl;
button.hidden = false;
const backup = bookingLink.closest(".booking-direct");
backup.hidden = true;
let loadTimer;
window.addEventListener("message", event => {
  const frame = document.querySelector("#calendly-embed iframe");
  if (event.origin !== "https://calendly.com" || !frame || event.source !== frame.contentWindow) return;
  if (event.data?.event === "calendly.event_type_viewed" || event.data?.event === "calendly.date_and_time_selected") {
    clearTimeout(loadTimer);
    backup.hidden = true;
    status.textContent = "Choose an available date below.";
  }
});
let started = false;
button.addEventListener("click", () => {
  calendar.hidden = false;
  button.setAttribute("aria-expanded", "true");
  if (started) { calendar.scrollIntoView({block:"start"}); return; }
  started = true;
  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;
  const fail = () => { backup.hidden = false; status.textContent = "The calendar couldn’t load. Please use the Calendly link above to choose a time."; };
  backup.hidden = true;
  status.textContent = "Loading booking calendar…";
  loadTimer = setTimeout(fail, 15000);
  script.onerror = () => { clearTimeout(loadTimer); fail(); started = false; script.remove(); };
  script.onload = () => {
    if (!window.Calendly) { fail(); started = false; return; }
    try {
      document.getElementById("calendly-embed").replaceChildren();
      window.Calendly.initInlineWidget({url:bookingUrl,parentElement:document.getElementById("calendly-embed")});
      // The Calendly message confirms the booking interface is ready.
    } catch { fail(); started = false; }
  };
  document.head.appendChild(script);
  calendar.scrollIntoView({block:"start"});
});
