(() => {
  const TOKEN_KEY = "bfl_auth_v1";
  const RETURN_KEY = "bfl_return_to";

  function detectBase() {
    const host = (location.hostname || "").toLowerCase();
    if (host.endsWith("github.io")) {
      const seg = (location.pathname.split("/").filter(Boolean)[0] || "").trim();
      return seg ? `/${seg}` : "";
    }
    return "";
  }

  const BASE = detectBase();

  async function loadAuthConfig() {
    // cache-bust so updates show immediately
    const url = `${BASE}/auth.json?v=${Date.now()}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("auth.json not found");
    return await res.json();
  }

  function currentFile(pathname) {
    const p = (pathname || "/");
    const parts = p.split("/").filter(Boolean);
    const last = parts[parts.length - 1] || "index.html";
    return last.includes(".") ? last : "index.html";
  }

  function isPublic(pathname) {
    const file = currentFile(pathname);
    if (file === "login.html" || file === "hash.html") return true;
    if (file === "password-gate.js" || file === "auth.json") return true;

    // allow assets
    if (
      pathname.startsWith("/assets/") ||
      pathname.startsWith("/images/") ||
      pathname.startsWith("/css/") ||
      pathname.startsWith("/js/") ||
      pathname.startsWith("/fonts/")
    ) return true;

    return false;
  }

  function isAuthed() {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return false;
    try {
      const obj = JSON.parse(raw);
      return obj.ok === true && Date.now() < (obj.exp || 0);
    } catch {
      return false;
    }
  }

  function redirectToLogin() {
    const returnTo = location.pathname + location.search + location.hash;
    localStorage.setItem(RETURN_KEY, returnTo);
    location.replace(`${BASE}/login.html`);
  }

  (async () => {
    // Normalize pathname when BASE exists (github.io)
    const pathname = location.pathname.startsWith(BASE + "/")
      ? location.pathname.slice(BASE.length) || "/"
      : location.pathname;

    if (isPublic(pathname)) return;
    if (isAuthed()) return;

    // If auth.json is missing, do NOT block the site (fail open)
    try {
      const cfg = await loadAuthConfig();
      if (!cfg.expectedHash || String(cfg.expectedHash).length < 20) return;
      // if there is an expectedHash, then enforce login
      redirectToLogin();
    } catch {
      // fail open if config missing
      return;
    }
  })();
})();
