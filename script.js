// تفضيل الوضع الداكن/الفاتح
(function initTheme() {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "light");
  document.body.classList.remove("light", "dark");
  document.body.classList.add(initial);
})();

const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    document.body.classList.toggle("dark", !isDark);
    document.body.classList.toggle("light", isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
    themeBtn.innerHTML = !isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });
  // مزامنة الأيقونة مع الوضع الحالي
  themeBtn.innerHTML = document.body.classList.contains("dark")
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

// قائمة الموبايل
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("nav-menu");
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

// تمييز الرابط النشط حسب القسم الظاهر
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav__link");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.nav__link[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  { rootMargin: "-50% 0px -40% 0px", threshold: 0 }
);
sections.forEach(sec => observer.observe(sec));

// سنة الفوتر
document.getElementById("year").textContent = new Date().getFullYear();
