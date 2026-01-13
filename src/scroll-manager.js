const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
    //  else {
    //   entry.target.classList.remove("visible");
    // }
  });
});

const sections = document.querySelectorAll(".animate-enter");
const enterLeftSections = document.querySelectorAll(".animate-enter-left");
const enterRightSections = document.querySelectorAll(".animate-enter-right");
sections.forEach((section) => observer.observe(section));
enterLeftSections.forEach((section) => observer.observe(section));
enterRightSections.forEach((section) => observer.observe(section));
