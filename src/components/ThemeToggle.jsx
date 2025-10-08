import { useState, useEffect } from "react";
import { Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(
    localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    const theme = isLight ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isLight]);

  return (
    <div className="theme-switch">
      <div className="theme-label">
        <Sun className="theme-icon" />
        <span>Light Theme</span>
      </div>

      <label className="switch">
        <input
          type="checkbox"
          checked={isLight}
          onChange={() => setIsLight(!isLight)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}
