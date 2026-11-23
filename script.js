const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});


const typingEl = document.getElementById("typingText");
const roles = [
  "React, Redux Toolkit & Node.js",
  "RESTful APIs & MongoDB",
  "Google Gemini AI Tools",
  "Interactive Dashboards"
];
let roleIdx = 0;
let charIdx = 0;
let deleting = false;

function runTyping() {
  if (!typingEl) return;
  const current = roles[roleIdx];
  charIdx = deleting ? charIdx - 1 : charIdx + 1;
  typingEl.textContent = current.substring(0, charIdx);

  let delay = deleting ? 45 : 95;
  if (!deleting && charIdx === current.length) {
    delay = 1800;
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 350;
  }
  setTimeout(runTyping, delay);
}
runTyping();

const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    projectCards.forEach((card) => {
      const cat = card.getAttribute("data-category");
      card.style.display = filter === "all" || cat === filter ? "flex" : "none";
    });
  });
});

const certModal = document.getElementById("certModal");
const certFrame = document.getElementById("certFrame");
const modalTitle = document.getElementById("modalTitle");
const closeModal = document.getElementById("closeModal");

function hideModal() {
  if (!certModal) return;
  certModal.classList.remove("open");
  if (certFrame) certFrame.src = "";
}

document.querySelectorAll(".btn-cert-preview[data-cert]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const file = btn.getAttribute("data-cert");
    const title = btn.getAttribute("data-title");
    modalTitle.textContent = title;
    certFrame.src = file;
    certModal.classList.add("open");
  });
});

closeModal?.addEventListener("click", hideModal);

certModal?.addEventListener("click", (e) => {
  if (e.target === certModal) hideModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && certModal?.classList.contains("open")) {
    hideModal();
  }
});


const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll("#navLinks a");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  const btt = document.getElementById("backToTop");
  if (btt) btt.classList.toggle("show", scrollY > 400);

  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");
    if (scrollY >= top && scrollY < top + height) {
      navAnchors.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
      });
    }
  });
});

document.getElementById("backToTop")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


document.getElementById("contactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  const body = `Hi Kushum,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
  window.location.href = `mailto:mauryakushum625@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
});


const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();