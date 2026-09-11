"use strict";

// Resolve the theme before the stylesheet loads to avoid flashing the wrong palette.
(() => {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  let preference = null;

  try {
    const savedTheme = localStorage.getItem("darkSwitch");
    if (savedTheme === "light" || savedTheme === "dark") {
      preference = savedTheme;
    } else if (savedTheme !== null) {
      console.warn("Ignoring an unrecognized saved theme preference; using your system theme.");
    }
  } catch (error) {
    console.warn("Theme preference is unavailable; using your system theme.", error);
  }

  function applyTheme() {
    const theme = preference ?? (systemTheme.matches ? "dark" : "light");
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = theme;
    themeColor.content = isDark ? "#1c2721" : "#f6f3eb";

    const toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      toggle.setAttribute("aria-label", `Switch to ${isDark ? "daylight" : "evening"} mode`);
      toggle.querySelector("[data-theme-label]").textContent = isDark ? "Daylight" : "Evening";
    }
  }

  applyTheme();
  systemTheme.addEventListener("change", () => {
    if (preference === null) {
      applyTheme();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".theme-toggle");
    applyTheme();
    toggle.hidden = false;
    toggle.addEventListener("click", () => {
      preference = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme();

      try {
        localStorage.setItem("darkSwitch", preference);
      } catch (error) {
        console.warn("Your theme changed, but this browser could not save the preference.", error);
      }
    });
  });
})();
