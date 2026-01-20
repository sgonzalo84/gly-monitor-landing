/**
 * Scroll animations
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
 * Formulario contacto
 **/
const form = document.getElementById("formulario-contacto");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mpqqqakr", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        showToast(
          "¡Gracias por tu feedback! Valoramos mucho tu opinión.",
          "success"
        );
        e.target.reset();
      } else {
        showToast(
          "Hubo un error al enviar el mensaje. Inténtalo de nuevo",
          "error"
        );
      }
    } catch (err) {
      console.error(err);
      showToast(
        "Hubo un error al enviar el mensaje. Inténtalo de nuevo",
        "error"
      );
    }
  });
}
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = `toast-enter flex items-center gap-3 bg-white rounded-lg shadow-lg p-4 min-w-[300px] max-w-md border-l-4 ${
    type === "success" ? "border-green-500" : "border-red-500"
  }`;
  const icon = type === "success" ? "check_circle" : "error";
  const iconColor = type === "success" ? "text-green-500" : "text-red-500";
  toast.innerHTML = `
        <span class="material-icons-round ${iconColor}">${icon}</span>
        <p class="flex-1 text-gray-800 font-medium">${message}</p>
        <button onclick="this.parentElement.remove()" class="material-icons-round text-gray-400 hover:text-gray-600 text-xl">
          close
        </button>
      `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("toast-enter");
    toast.classList.add("toast-exit");
    setTimeout(() => toast.remove(), 300);
  }, 10000);
}
