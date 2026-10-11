/**
 * Consentimiento de cookies (analítica con Google Tag Manager)
 *
 * - GTM NO se carga hasta que el usuario pulsa "Aceptar".
 * - La decisión se guarda en localStorage durante 12 meses.
 * - Se puede cambiar en cualquier momento con cualquier elemento que tenga
 *   el atributo data-cookie-settings (por ejemplo, un enlace en el footer).
 */
(() => {
  const STORAGE_KEY = "glymo-cookie-consent";
  const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000; // 12 meses
  const GTM_LOADER_SRC = "/js/gtm-loader.js";
  const PRIVACY_URL = "/privacidad.html";

  let gtmLoaded = false;
  let banner = null;

  /* ---------- Almacenamiento ---------- */
  function readConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (typeof data.analytics !== "boolean" || !data.ts) return null;
      if (Date.now() - data.ts > MAX_AGE_MS) return null; // caducado
      return data;
    } catch {
      return null;
    }
  }

  function saveConsent(analytics) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ analytics, ts: Date.now() }),
      );
    } catch {
      /* sin almacenamiento: se volverá a preguntar en la próxima visita */
    }
  }

  /* ---------- GTM ---------- */
  function loadGtm() {
    if (gtmLoaded) return;
    gtmLoaded = true;
    const script = document.createElement("script");
    script.src = GTM_LOADER_SRC;
    script.async = true;
    document.head.appendChild(script);
  }

  // Borra, en la medida de lo posible, las cookies de analítica de Google.
  function deleteAnalyticsCookies() {
    const hostParts = location.hostname.split(".");
    const domains = [location.hostname];
    if (hostParts.length > 2) {
      domains.push("." + hostParts.slice(-2).join("."));
    } else {
      domains.push("." + location.hostname);
    }
    document.cookie.split(";").forEach((c) => {
      const name = c.split("=")[0].trim();
      if (/^(_ga|_gid|_gat|_gcl)/.test(name)) {
        domains.forEach((d) => {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
        });
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      }
    });
  }

  /* ---------- Banner ---------- */
  function hideBanner() {
    if (banner) {
      banner.remove();
      banner = null;
    }
  }

  function decide(analytics) {
    const hadGtm = gtmLoaded;
    saveConsent(analytics);
    hideBanner();
    if (analytics) {
      loadGtm();
    } else if (hadGtm) {
      // GTM ya estaba cargado en esta página: se recarga para desactivarlo.
      deleteAnalyticsCookies();
      location.reload();
    } else {
      deleteAnalyticsCookies();
    }
  }

  function showBanner() {
    if (banner) return;
    banner = document.createElement("div");
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Preferencias de cookies");
    banner.className =
      "fixed inset-x-4 bottom-4 z-100 mx-auto max-w-3xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark p-5 shadow-2xl";
    banner.innerHTML = `
      <div class="flex flex-col gap-4 md:flex-row md:items-center">
        <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed md:flex-1">
          Usamos cookies de medición (Google Tag Manager) para entender cómo se
          usa la web y mejorarla. Solo se activan si las aceptas. Puedes
          cambiar tu decisión cuando quieras. Más información en nuestra
          <a class="underline text-primary" href="${PRIVACY_URL}">política de privacidad</a>.
        </p>
        <div class="flex gap-3 shrink-0">
          <button type="button" data-consent="reject"
            class="flex-1 md:flex-none inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
            Rechazar
          </button>
          <button type="button" data-consent="accept"
            class="flex-1 md:flex-none inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-transparent bg-primary text-sm font-medium text-white hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            Aceptar
          </button>
        </div>
      </div>
    `;
    banner
      .querySelector('[data-consent="accept"]')
      .addEventListener("click", () => decide(true));
    banner
      .querySelector('[data-consent="reject"]')
      .addEventListener("click", () => decide(false));
    document.body.appendChild(banner);
  }

  /* ---------- Arranque ---------- */
  function init() {
    const consent = readConsent();
    if (consent === null) {
      showBanner();
    } else if (consent.analytics) {
      loadGtm();
    }

    // Cualquier elemento con data-cookie-settings reabre el banner.
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-cookie-settings]");
      if (trigger) {
        e.preventDefault();
        showBanner();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
