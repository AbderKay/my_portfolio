// Low-level recovery for stale-deploy failures, injected inline in <head> so it
// runs even when the main JS/CSS bundle fails to load (the case the React error
// boundaries in app/error.tsx and app/global-error.tsx cannot catch, because
// React never boots — leaving a blank page with no error to catch).
//
// Three guards, all reloading at most once (throttled via sessionStorage) so a
// genuinely broken deploy can never trap the visitor in a reload loop:
//   1. a failed <script>/<link> chunk request (capture-phase "error" event),
//   2. a failed dynamic import() (surfaces as an unhandledrejection),
//   3. a boot watchdog — if the app never signals ready, reload once per session.
//
// Kept as a plain-JS string (like themeScript) and stringified into the page.

export const bootGuardScript = `(function(){
  if (typeof window === "undefined") return;
  var CHUNK = /ChunkLoadError|Loading chunk|Loading CSS chunk|dynamically imported module|importing a module script failed|is not a valid JavaScript MIME type|failed to fetch dynamically imported/i;
  function reloadOnce(key, windowMs){
    try {
      var last = Number(sessionStorage.getItem(key) || "0");
      if (Date.now() - last > windowMs) {
        sessionStorage.setItem(key, String(Date.now()));
        window.location.reload();
        return true;
      }
    } catch (e) {}
    return false;
  }
  // 1) Failed <script>/<link> resource loads (chunks removed by a new deploy).
  window.addEventListener("error", function(e){
    var t = e && e.target;
    var tag = t && t.tagName;
    if (tag === "SCRIPT" || tag === "LINK") {
      var url = String((t && (t.src || t.href)) || "");
      if (url.indexOf("/_next/") !== -1) reloadOnce("__chunk_reload_at", 10000);
      return;
    }
    if (e && CHUNK.test(e.message || "")) reloadOnce("__chunk_reload_at", 10000);
  }, true);
  // 2) Failed dynamic import() -> unhandled promise rejection.
  window.addEventListener("unhandledrejection", function(e){
    var r = e && e.reason;
    var msg = (r && (r.message || r.name)) || (typeof r === "string" ? r : "");
    if (CHUNK.test(msg)) reloadOnce("__chunk_reload_at", 10000);
  });
  // 3) Boot watchdog: if React never mounts (blank page, no error thrown),
  // reload once. A long window makes it effectively once per tab session, so a
  // real outage shows the page as-is instead of looping.
  window.setTimeout(function(){
    if (!window.__appReady) reloadOnce("__boot_reload_at", 21600000);
  }, 10000);
})();`;
