"use strict";

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const sectionLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const linkedSections = sectionLinks.map((link) => document.querySelector(link.getAttribute("href")));

if ("IntersectionObserver" in window) {
  const visibleSections = new Set();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target.id);
        } else {
          visibleSections.delete(entry.target.id);
        }
      }

      const currentSection = linkedSections.find((section) => visibleSections.has(section.id));
      for (const link of sectionLinks) {
        if (currentSection && link.hash === `#${currentSection.id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      }
    },
    { rootMargin: "-10% 0px -40% 0px", threshold: 0 },
  );

  linkedSections.forEach((section) => observer.observe(section));
}
