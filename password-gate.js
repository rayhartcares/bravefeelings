/* Brave Feelings Lab - Password Gate (GitHub Pages + Custom Domain)
   Note: This is a lightweight gate (client-side). Not true security.
*/
(() => {
  const TOKEN_KEY = "bfl_auth_v1";
  const RETURN_KEY = "bfl_return_to";
  const SESSION_HOURS = 12;

  // Default password is: BFL2025!
  // SHA-256("BFL2025!") =
  const EXPECTED_HASH =
    "c63d15ad656cad56b4e65e8d5099e3f96254078487018d42e98423d5cd4b5a61";

  function detectBase() {
    const host = (location.hostname || "").toLowerCase();
    if (host.endsWith("github.io")) {
      const seg = (location.pathname.split("/").filter(Boolean)[0] || "").trim();
      return seg ? `/${seg}` : "";
    }
    return "";
  }

  const BASE = detectBase();

  function getPathNoBase() {
    const p = location.pathname || "/";
    if (BASE && p.startsWith(BASE + "/")) return p.slice(BASE.length) || "/";
    return p;
  }

  function currentFile(p) {
    const parts = (p || "/").split("/").filter(Boolean);
    if (!parts.length) return "index.html";
    const last = parts[parts.length - 1];
    return last.includes(".") ? last : "index.html";
  }

  function isPublic(p) {
    const file = currentFile(p);

    // Pages that must always remain accessible
    if (file === "login.html" || file === "hash.html") return true;
    if (file === "password-gate.js") return true;

    // Let assets load without being blocked
    if (p.startsWith("/assets/") || p.startsWith("/images/") || p.startsWith("/css/") || p.startsWith("/js/") || p.startsWith("/fonts/")) {
      return true;
    }

    return false;
  }

  function isAuthed() {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return false;
    try {
      const obj = JSON.parse(raw);
      return obj.ok === true && (!obj.exp || Date.now() < obj.exp);
    } catch {
      return false;
    }
  }

  function goLogin() {
    const returnTo = getPathNoBase() + (location.search || "") + (location.hash || "");
    sessionStorage.setItem(RETURN_KEY, returnTo || "/");
    location.replace(BASE + "/login.html");
  }

  const pathNoBase = getPathNoBase();

  if (!isAuthed() && !isPublic(pathNoBase)) {
    goLogin();
  }
})();
