import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";

  // protected API হলে BetterAuth থেকে JWT নিয়ে Authorization header-এ বসাই
  if (auth) {
    const { data } = await authClient.token();
    if (!data?.token) throw new Error("অনুগ্রহ করে আগে লগইন করুন");
    headers.Authorization = `Bearer ${data.token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "কিছু ভুল হয়েছে, আবার চেষ্টা করুন");
  return json;
}