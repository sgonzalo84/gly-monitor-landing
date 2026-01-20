class GlymoLandingHeader extends HTMLElement {
  constructor() {
    super();

    this.handleMenuButtonClick = (e) => {
      e.stopPropagation();
      const isOpen = this.mobileMenu.classList.contains("max-h-96");
      this.toggleMenu(!isOpen);
    };

    this.handleDocumentClick = () => {
      this.toggleMenu(false);
    };

    this.handleThemeToggle = () => {
      const willBeDark = !document.documentElement.classList.contains("dark");
      this.applyTheme(willBeDark);
      localStorage.setItem("color-theme", willBeDark ? "dark" : "light");
    };
  }

  connectedCallback() {
    this.render();

    this.manageMobileMenu();
    this.manageTheme();
  }

  disconnectedCallback() {
    this.mobileMenuButton.removeEventListener(
      "click",
      this.handleMenuButtonClick
    );
    this.themeToggleBtn.removeEventListener("click", this.handleThemeToggle);
    document.removeEventListener("click", this.handleDocumentClick);
  }

  manageMobileMenu() {
    this.mobileMenuButton = this.querySelector("#mobile-menu-button");
    this.mobileMenu = this.querySelector("#mobile-menu");
    this.menuIcon = this.querySelector("#menu-icon");
    this.closeIcon = this.querySelector("#close-icon");

    this.mobileMenuButton.addEventListener("click", this.handleMenuButtonClick);
    document.addEventListener("click", this.handleDocumentClick);
  }

  manageTheme() {
    this.themeToggleBtn = this.querySelector("#theme-toggle");
    this.themeToggleDarkIcon = this.querySelector("#theme-toggle-dark-icon");
    this.themeToggleLightIcon = this.querySelector("#theme-toggle-light-icon");

    const savedTheme = localStorage.getItem("color-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    this.applyTheme(isDark);

    this.themeToggleBtn.addEventListener("click", this.handleThemeToggle);
  }

  applyTheme(isDark) {
    document.documentElement.classList.toggle("dark", isDark);
    this.themeToggleLightIcon.classList.toggle("hidden", !isDark);
    this.themeToggleDarkIcon.classList.toggle("hidden", isDark);
  }

  toggleMenu(shouldOpen) {
    if (this.mobileMenu) {
      const openClasses = ["max-h-96", "opacity-100"];
      const closeClasses = ["max-h-0", "opacity-0"];

      if (shouldOpen) {
        this.mobileMenu.classList.remove(...closeClasses);
        this.mobileMenu.classList.add(...openClasses);
        this.menuIcon.classList.add("hidden");
        this.closeIcon.classList.remove("hidden");
      } else {
        this.mobileMenu.classList.remove(...openClasses);
        this.mobileMenu.classList.add(...closeClasses);
        this.menuIcon.classList.remove("hidden");
        this.closeIcon.classList.add("hidden");
      }
    }
  }

  render() {
    this.innerHTML = `
    <nav
      class="fixed w-full z-50 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="shrink-0 flex items-center gap-2">
           <a class="flex items-center gap-2" href="/">
                <img
                    alt="Logo de Glymo"
                    height="36px"
                    width="36px"
                    src="./assets/logo/glymo-logo.webp"
                    loading="eager"
                />
                <span class="font-display font-bold text-2xl tracking-wide text-gray-900 dark:text-white">
                    Glymo
                </span>
            </a>
          </div>

          <div class="hidden md:flex items-center px-4">
            <a
              class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 transition-colors text-sm font-medium"
              href="/#funcionalidades"
              >Funcionalidades</a
            >
            <a
              class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 transition-colors text-sm font-medium"
              href="/#testimonios"
              >Testimonios</a
            >
            <a
              class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 transition-colors text-sm font-medium"
              href="/#historia"
              >Nuestra historia</a
            >
            <a
              class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 transition-colors text-sm font-medium"
              href="/#faqs"
              >Preguntas frecuentes</a
            >
            <a
              class="hidden lg:block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 transition-colors text-sm font-medium"
              href="/#descargar-app"
              >Descargar app</a
            >
            <a
              class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 transition-colors text-sm font-medium"
              href="/#contacto"
              >Contacto</a
            >
          </div>

          <div class="flex items-center gap-4">
            <button
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              id="theme-toggle"
            >
              <span
                class="material-icons-round hidden"
                id="theme-toggle-dark-icon"
                >dark_mode</span
              >
              <span
                class="material-icons-round hidden"
                id="theme-toggle-light-icon"
                >light_mode</span
              >
            </button>
           
            <button
              class="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              id="mobile-menu-button"
            >
              <span class="material-icons-round" id="menu-icon">menu</span>
              <span class="material-icons-round hidden" id="close-icon">
                close
              </span>
            </button>
          </div>
        </div>
      </div>

   
      <div
        class="md:hidden overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0 shadow-2xl"
        id="mobile-menu"
      >
        <div
          class="px-2 pt-2 pb-3 space-y-1 bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800"
        >
          <a
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            href="/#funcionalidades"
            >Funcionalidades</a
          >
          <a
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            href="/#testimonios"
            >Testimonios</a
          >
          <a
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            href="/#historia"
            >Nuestra historia</a
          >
          <a
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            href="/#faqs"
            >Preguntas frecuentes</a
          >
          <a
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            href="/#descargar-app"
            >Descargar app</a
          >
          <a
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            href="/#contacto">
            Contacto
            </a>
        </div>
      </div>
    </nav>
    `;
  }
}

class GlymoLandingFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer
      class="bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 pt-12 pb-8"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16"
        >
          <div class="max-w-md">
            <div class="flex items-center md:justify-center gap-2 mb-4">
              <img
                alt="Logo de Glymo"
                height="50px"
                width="50px"
                src="./assets/logo/logo-50x50.png"
                loading="lazy"
              />
              <span
                class="font-display font-bold text-4xl text-gray-900 dark:text-white"
              >
                Glymo
              </span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Gestión de la diabetes, simplificada.
            </p>
          </div>
          <div
            class="flex flex-col sm:flex-row gap-8 sm:gap-16 w-full md:w-auto"
          >
            <div class="flex flex-col space-y-3">
              <p
                class="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider"
              >
                Enlaces
              </p>
              <a
                class="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                href="#funcionalidades"
                >Funcionalidades</a
              >
              <a
                class="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                href="#historia"
                >Nuestra Historia</a
              >
              <a
                class="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                href="#faqs"
                >Preguntas frecuentes</a
              >
              <a
                class="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                href="#descargar-app"
                >Descargar APP</a
              >
              <a
                class="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                href="#contacto"
                >Contacto</a
              >
              <a
                class="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium"
                href="https://gly-monitor.web.app/login"
                >Comenzar ahora</a
              >
            </div>
            <div class="flex flex-col space-y-3">
              <p
                class="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider"
              >
                Legal
              </p>
              <a
                class="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                href="terminos.html"
                >Términos</a
              >
              <a
                class="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                href="privacidad.html"
                >Privacidad</a
              >
            </div>
          </div>
        </div>
        <div
          class="border-t border-gray-100 dark:border-gray-800 mt-12 pt-8 text-center"
        >
          <p class="text-xs text-gray-600 dark:text-gray-500">
            © <span class="current-year"></span> Glymo. No es consejo médico.
            Consulta siempre a tu doctor.
          </p>
        </div>
      </div>
    </footer>
    `;
    this.querySelector(".current-year").textContent = new Date().getFullYear();
  }
}

// Registramos las etiquetas personalizadas
customElements.define("glymo-header", GlymoLandingHeader);
customElements.define("glymo-footer", GlymoLandingFooter);
