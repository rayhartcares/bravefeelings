/*!
 * Brave Feelings Lab — Password Gate (client-side)
 */
(() => {
  "use strict";

  const CONFIG = {
    tokenKey: "bfl_auth_v1",
    returnKey: "bfl_return_to_v1",
    sessionHours: 12,
    // Pulls from password-config.js; falls back to the new hash if missing
    expectedHashes: [
      window.BFL_EXPECTED_HASH || "b8a137cb2c0a7f90827dc03b78395624d32d7dc701b6e094a8bc5d8940723752"
    ],
    publicPages: new Set(["login.html", "hash.html"]),
    bypassParam: "nogate",
  };

  function normalizeBase(b) {
    if (!b) return "";
    b = String(b).trim();
    if (!b.startsWith("/")) b = "/" + b;
    if (b.endsWith("/")) b = b.slice(0, -1);
    return b;
  }

  function detectBase() {
    if (typeof window.__BFL_BASE__ === "string") return normalizeBase(window.__BFL_BASE__);
    const host = (location.hostname || "").toLowerCase();
    if (host.endsWith("github.io")) {
      const seg = location.pathname.split("/").filter(Boolean)[0] || "";
      return seg ? "/" + seg : "";
    }
    return "";
  }

  const BASE = detectBase();
  const siteUrl = (path) => location.origin + BASE + path;
  const stripBase = (p) => (BASE && p.startsWith(BASE + "/")) ? p.slice(BASE.length) : p;

  function currentFile() {
    const p = stripBase(location.pathname);
    if (!p || p === "/") return "index.html";
    const last = p.split("/").filter(Boolean).pop() || "index.html";
    return last.includes(".") ? last : "index.html";
  }

  const isPublicPage = () => {
    if (new URLSearchParams(location.search).has(CONFIG.bypassParam)) return true;
    return CONFIG.publicPages.has(currentFile().toLowerCase());
  };

  const isAuthed = () => {
    try {
      const obj = JSON.parse(localStorage.getItem(CONFIG.tokenKey));
      return obj && obj.ok && Date.now() < obj.exp;
    } catch { return false; }
  };

  const requireAuth = () => {
    if (isPublicPage() || isAuthed()) return;
    localStorage.setItem(CONFIG.returnKey, stripBase(location.pathname) + location.search + location.);
    location.replace(siteUrl("/login.html"));
  };

  window.BFLGate = {
    logout() {
      localStorage.removeItem(CONFIG.tokenKey);
      location.replace(siteUrl("/login.html"));
    }
  };

  requireAuth();
})();
