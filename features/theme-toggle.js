/* Portfolio theme switcher.
   The selected theme persists across all pages on this site. */

(function () {
  "use strict";

  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");
  var storageKey = "subrata-portfolio-theme";

  function getTheme() {
    try {
      return window.localStorage.getItem(storageKey) === "dark"
        ? "dark"
        : "light";
    } catch (error) {
      return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    }
  }

  function applyTheme(theme, savePreference) {
    var isDark = theme === "dark";

    root.setAttribute("data-theme", isDark ? "dark" : "light");

    root.style.colorScheme = isDark ? "dark" : "light";

    if (button) {
      button.setAttribute("aria-pressed", String(isDark));

      button.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme",
      );

      button.setAttribute(
        "title",
        isDark ? "Switch to light theme" : "Switch to dark theme",
      );

      /*
       * Light theme: show the moon icon.
       * Dark theme: show the sun icon.
       * The SVG icons are already present in the HTML.
       */
      var moon = button.querySelector(".theme-icon-moon");
      var sun = button.querySelector(".theme-icon-sun");

      if (moon) {
        moon.style.display = isDark ? "none" : "block";
      }

      if (sun) {
        sun.style.display = isDark ? "block" : "none";
      }
    }

    var themeColor = document.querySelector('meta[name="theme-color"]');

    if (themeColor) {
      themeColor.setAttribute("content", isDark ? "#111713" : "#f8f8f5");
    }

    if (savePreference) {
      try {
        window.localStorage.setItem(storageKey, isDark ? "dark" : "light");
      } catch (error) {
        /*
         * Theme switching still works for the current page
         * if browser storage is unavailable.
         */
      }
    }
  }

  /*
   * Restore the saved preference.
   * default.html also applies the theme before CSS loads,
   * helping prevent a flash of the wrong theme.
   */
  applyTheme(getTheme(), false);

  if (button) {
    button.addEventListener("click", function () {
      var currentTheme =
        root.getAttribute("data-theme") === "dark" ? "dark" : "light";

      var nextTheme = currentTheme === "dark" ? "light" : "dark";

      applyTheme(nextTheme, true);
    });
  }
})();
