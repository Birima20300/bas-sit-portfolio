"use strict";

/* =========================================================
   BAS SIT — PORTFOLIO V3
========================================================= */

/* =========================
   LUCIDE
========================= */

function refreshIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

refreshIcons();

/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

if (menuToggle && mainNav) {

  menuToggle.addEventListener("click", () => {

    const opened =
      mainNav.classList.toggle("is-open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(opened)
    );

    menuToggle.setAttribute(
      "aria-label",
      opened
        ? "Fermer le menu"
        : "Ouvrir le menu"
    );

    const icon =
      menuToggle.querySelector("i");

    if (icon) {

      icon.setAttribute(
        "data-lucide",
        opened ? "x" : "menu"
      );

      refreshIcons();
    }

  });

  mainNav.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      mainNav.classList.remove("is-open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Ouvrir le menu"
      );

      const icon =
        menuToggle.querySelector("i");

      if (icon) {

        icon.setAttribute(
          "data-lucide",
          "menu"
        );

        refreshIcons();
      }

    });

  });

}

/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
  document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}

/* =========================
   PROJECT FILTERS
========================= */

const filterButtons =
  document.querySelectorAll(".filter-btn");

const projectCards =
  document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const filter =
      button.dataset.filter;

    projectCards.forEach((card) => {

      const categories =
        card.dataset.category || "";

      const visible =
        filter === "all" ||
        categories
          .split(" ")
          .includes(filter);

      card.classList.toggle(
        "is-hidden",
        !visible
      );

    });

  });

});

/* =========================
   TERMINAL COPY
========================= */

const copyButton =
  document.querySelector("#copyTerminal");

if (copyButton) {

  copyButton.addEventListener(
    "click",
    async () => {

      const terminal =
        document.querySelector(
          "#terminalContent"
        );

      if (!terminal) {
        return;
      }

      try {

        await navigator.clipboard.writeText(
          terminal.innerText
        );

        copyButton.classList.add(
          "copied"
        );

        const icon =
          copyButton.querySelector("i");

        if (icon) {

          icon.setAttribute(
            "data-lucide",
            "check"
          );

          refreshIcons();
        }

        setTimeout(() => {

          copyButton.classList.remove(
            "copied"
          );

          const currentIcon =
            copyButton.querySelector("i");

          if (currentIcon) {

            currentIcon.setAttribute(
              "data-lucide",
              "copy"
            );

            refreshIcons();
          }

        }, 1500);

      } catch (error) {

        console.warn(
          "Impossible de copier le terminal.",
          error
        );

      }

    }
  );

}

/* =========================
   HEADER ON SCROLL
========================= */

const header =
  document.querySelector(".site-header");

function updateHeader() {

  if (!header) {
    return;
  }

  header.classList.toggle(
    "scrolled",
    window.scrollY > 20
  );

}

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();

/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".main-nav a"
  );

if (
  sections.length &&
  navLinks.length &&
  "IntersectionObserver" in window
) {

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          navLinks.forEach((link) => {
            link.classList.remove(
              "active"
            );
          });

          const activeLink =
            document.querySelector(
              `.main-nav a[href="#${entry.target.id}"]`
            );

          if (activeLink) {
            activeLink.classList.add(
              "active"
            );
          }

        });

      },
      {
        rootMargin:
          "-35% 0px -55% 0px"
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

}

/* =========================
   CURRENT YEAR
========================= */

const currentYear =
  document.querySelector(
    "#currentYear"
  );

if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}

/* =========================
   SMOOTH ANCHORS
========================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const id =
          link.getAttribute("href");

        if (!id || id === "#") {
          return;
        }

        const target =
          document.querySelector(id);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });

/* =========================
   PROJECT CARD POINTER GLOW
========================= */

const finePointer =
  window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

if (finePointer) {

  projectCards.forEach((card) => {

    card.addEventListener(
      "pointermove",
      (event) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        card.style.setProperty(
          "--mouse-x",
          `${x}px`
        );

        card.style.setProperty(
          "--mouse-y",
          `${y}px`
        );

      }
    );

    card.addEventListener(
      "pointerleave",
      () => {

        card.style.removeProperty(
          "--mouse-x"
        );

        card.style.removeProperty(
          "--mouse-y"
        );

      }
    );

  });

}

/* =========================
   TERMINAL PARALLAX
========================= */

if (finePointer) {

  const terminal =
    document.querySelector(
      ".terminal-card"
    );

  if (terminal) {

    document.addEventListener(
      "mousemove",
      (event) => {

        const x =
          (
            event.clientX /
            window.innerWidth -
            0.5
          ) * 2;

        const y =
          (
            event.clientY /
            window.innerHeight -
            0.5
          ) * 2;

        terminal.style.transform =
          `perspective(1000px)
           rotateY(${x * 1.5}deg)
           rotateX(${y * -1.5}deg)`;

      }
    );

    terminal.addEventListener(
      "mouseleave",
      () => {
        terminal.style.transform = "";
      }
    );

  }

}

/* =========================
   KEYBOARD ESCAPE
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key !== "Escape" ||
      !mainNav ||
      !menuToggle
    ) {
      return;
    }

    mainNav.classList.remove(
      "is-open"
    );

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Ouvrir le menu"
    );

    const icon =
      menuToggle.querySelector("i");

    if (icon) {

      icon.setAttribute(
        "data-lucide",
        "menu"
      );

      refreshIcons();
    }

  }
);

/* =========================
   READY
========================= */

document.documentElement.classList.add(
  "js-ready"
);
