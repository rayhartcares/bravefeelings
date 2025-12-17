/*!
 * Brave Feelings Lab — Password Gate (client-side)
 * Works on GitHub Pages + Custom Domain.
 * Note: This is NOT real security (people can view your files). It's a simple gate.
 */
(() => {
  "use strict";

  const CONFIG = {
    tokenKey: "bfl_auth_v1",
    returnKey: "bfl_return_to_v1",
    sessionHours: 12,

    // Put SHA-256 hex hash(es) of allowed password(s) here.
    // Replace this with YOUR hash from /hash.html
    expectedHashes: [
      "b2fceca9406e2400efe0e9379e5b05a376e4fed14eeb6177ea3709273dab0095", // default BFL2025!
    ],

    // Pages that are always public (no password)
    publicPages: new Set(["login.html", "hash.html"]),

    // Optional bypass for debugging: add ?nogate=1
    bypassParam: "nogate",
  };

  function normalizeBase(b) {
    if (!b) return "";
    b = String(b).trim();
    if (!b) return "";
    if (!b.startsWith("/")) b = "/" + b;
    if (b.endsWith("/")) b = b.slice(0, -1);
    return b;
  }

  function detectBase() {
    // Optional manual override if you ever need it:
    // Put this BEFORE loading password-gate.js:
    // <script>window.__BFL_BASE__="/bravefeelings";</script>
    if (typeof window.__BFL_BASE__ === "string") {
      return normalizeBase(window.__BFL_BASE__);
    }

    const host = (location.hostname || "").toLowerCase();

    // GitHub project pages usually look like: /REPO/...
    if (host.endsWith("github.io")) {
      const seg = location.pathname.split("/").filter(Boolean)[0] || "";
      return seg ? "/" + seg : "";
    }

    // Custom domain: served from root
    return "";
  }

  const BASE = detectBase();

  function siteUrl(path) {
    return location.origin + BASE + path;
  }

  function stripBase(pathname) {
    if (BASE && pathname.startsWith(BASE + "/")) return pathname.slice(BASE.length);
    return pathname;
  }

  function currentFile() {
    const p = stripBase(location.pathname);
    if (!p || p === "/") return "index.html";
    const parts = p.split("/").filter(Boolean);
    const last = parts[parts.length - 1] || "";
    if (!last) return "index.html";
    return last.includes(".") ? last : "index.html";
  }

  function isPublicPage() {
    if (new URLSearchParams(location.search).has(CONFIG.bypassParam)) return true;
    const file = currentFile().toLowerCase();
    return CONFIG.publicPages.has(file);
  }

  function readAuth() {
    const raw = localStorage.getItem(CONFIG.tokenKey);
    if (!raw) return null;
    try {
      const obj = JSON.parse(raw);
      if (obj && obj.ok === true && typeof obj.exp === "number") return obj;
      return null;
    } catch {
      return null;
    }
  }

  function isAuthed() {
    const obj = readAuth();
    if (!obj) return false;
    return Date.now() < obj.exp;
  }

  function setAuthed(hours = CONFIG.sessionHours) {
    const exp = Date.now() + hours * 60 * 60 * 1000;
    localStorage.setItem(CONFIG.tokenKey, JSON.stringify({ ok: true, exp }));
  }

  function clearAuth() {
    localStorage.removeItem(CONFIG.tokenKey);
  }

  function saveReturnTo() {
    const rel = stripBase(location.pathname) + location.search + location.hash;
    localStorage.setItem(CONFIG.returnKey, rel || "/");
  }

  function loadReturnTo() {
    return localStorage.getItem(CONFIG.returnKey) || "/";
  }

  async function sha256Hex(text) {
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  async function loginWithPassword(password) {
    const hash = await sha256Hex(password);
    const ok = CONFIG.expectedHashes.includes(hash);
    if (!ok) return { ok: false };

    setAuthed();
    const dest = loadReturnTo();
    localStorage.removeItem(CONFIG.returnKey);

    const destPath = dest.startsWith("/") ? dest : "/" + dest;
    location.replace(location.origin + BASE + destPath);
    return { ok: true };
  }

  function requireAuth() {
    // Always allow login/hash pages to load
    if (isPublicPage()) return;

    // Already authed
    if (isAuthed()) return;

    // Not authed → redirect to login
    saveReturnTo();
    location.replace(siteUrl("/login.html"));
  }

  // Expose helpers for login.html (so you change password ONLY in this one file)
  window.BFLGate = {
    BASE,
    config: CONFIG,
    sha256Hex,
    isAuthed,
    setAuthed,
    clearAuth,
    loadReturnTo,
    loginWithPassword,
    logout(redirect = true) {
      clearAuth();
      localStorage.removeItem(CONFIG.returnKey);
      if (redirect) location.replace(siteUrl("/login.html"));
    },
  };

  // Run the gate now
  requireAuth();
})();
