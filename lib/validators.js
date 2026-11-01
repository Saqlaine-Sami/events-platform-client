export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Donation",
  "Food Distribution",
  "Education Camp",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

// বাংলাদেশ সময় অনুযায়ী আজকের তারিখ
export function todayDhaka() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
}
export function tomorrowDhaka() {
  const d = new Date(todayDhaka() + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

// Password rule: ১টি uppercase + ১টি lowercase + কমপক্ষে ৬ অক্ষর
export function passwordError(pw) {
  if (!pw || pw.length < 6) return "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
  if (!/[A-Z]/.test(pw)) return "পাসওয়ার্ডে অন্তত একটি বড় হাতের (Uppercase) অক্ষর থাকতে হবে";
  if (!/[a-z]/.test(pw)) return "পাসওয়ার্ডে অন্তত একটি ছোট হাতের (Lowercase) অক্ষর থাকতে হবে";
  return null;
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!emailRegex.test(email || "")) errors.email = "সঠিক ইমেইল দিন";
  const pe = passwordError(password);
  if (pe) errors.password = pe;
  return errors;
}

export function validateRegister(values) {
  const errors = validateLogin(values);
  if (!values.name || values.name.trim().length < 2)
    errors.name = "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
  if (!isValidUrl(values.photoURL || ""))
    errors.photoURL = "সঠিক Photo URL দিন (https://...)";
  return errors;
}

export function validateEvent(v) {
  const errors = {};
  if (!v.title || v.title.trim().length < 5)
    errors.title = "টাইটেল কমপক্ষে ৫ অক্ষরের হতে হবে";
  if (!v.description || v.description.trim().length < 20)
    errors.description = "বর্ণনা কমপক্ষে ২০ অক্ষরের হতে হবে";
  if (!EVENT_TYPES.includes(v.eventType)) errors.eventType = "ইভেন্ট টাইপ নির্বাচন করুন";
  if (!isValidUrl(v.thumbnail || "")) errors.thumbnail = "সঠিক থাম্বনেইল URL দিন";
  if (!v.location || v.location.trim().length < 3) errors.location = "লোকেশন দিন";
  if (!v.date) errors.date = "তারিখ নির্বাচন করুন";
  else if (v.date <= todayDhaka())
    errors.date = "ইভেন্টের তারিখ অবশ্যই ভবিষ্যতের হতে হবে";
  return errors;
}