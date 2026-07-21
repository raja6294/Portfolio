import axios from "axios";

// ─── Backend Configuration ────────────────────────────────────────────────────
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// ─── Axios Instance ───────────────────────────────────────────────────────────
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ─── Contact API ──────────────────────────────────────────────────────────────
/**
 * Submit a contact form message to the Express backend.
 * @param {{ name: string, email: string, message: string }} payload
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function submitContactForm(payload) {
  const response = await apiClient.post("/api/contact", payload);
  return response.data;
}

export default apiClient;
