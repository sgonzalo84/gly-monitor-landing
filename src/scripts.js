/**
 * Theme selector
 */
const themeToggleBtn = document.getElementById("theme-toggle");
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.documentElement.classList.toggle("dark", prefersDark);
themeToggleLightIcon.classList.toggle("hidden", !prefersDark);
themeToggleDarkIcon.classList.toggle("hidden", prefersDark);

themeToggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");
});

/**
 * Scroll manager
 */
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document
  .querySelectorAll(".animate-enter")
  .forEach((element) => observer.observe(element));

/**
 * Footer
 */
document.querySelector(".current-year").textContent = new Date().getFullYear();
