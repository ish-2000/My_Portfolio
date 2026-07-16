import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends a booking request email via EmailJS.
 *
 * @param {Object} params
 * @param {string} params.userEmail   - The user's email address (reply-to)
 * @param {string} params.selectedDate - Human-readable selected date string
 * @param {string} params.duration    - Meeting duration label (e.g. "30 min")
 * @returns {Promise}
 */
export async function sendBookingEmail({ userEmail, selectedDate, duration }) {
  const templateParams = {
    to_email: "isharaudayanga1000@gmail.com", // your personal inbox
    reply_to: userEmail,                       // user's email for reply
    user_email: userEmail,
    selected_date: selectedDate,
    duration,
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
}
