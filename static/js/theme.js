function staticAsset(path) {
  const base = window.STATIC_URL || "/static/";
  return `${base}${String(path).replace(/^\/+/, "")}`;
}

function setTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  
    const icon = document.getElementById("themeToggleIcon");
    const btn = document.getElementById("themeToggle");
  
    if (icon) {
      icon.src = theme === "dark"
        ? staticAsset("images/lightstick_on.png")
        : staticAsset("images/lightstick_off.png");
  
      icon.alt = theme === "dark"
        ? "Dark mode lightstick icon"
        : "Light mode lightstick icon";
    }
  
    if (btn) {
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }
  
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || "light";
    setTheme(savedTheme);
  
    const btn = document.getElementById("themeToggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const next = document.body.classList.contains("dark") ? "light" : "dark";
        setTheme(next);
      });
    }
  }
