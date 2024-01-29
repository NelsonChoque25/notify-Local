
import { useAuth } from "../contexts/AuthContext";
import useSystemTheme from "./useSystemTheme";
import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useSystemTheme();
  const { userTheme } = useAuth();

  console.log("Tema del sistema:", theme);

  useEffect(() => {
    if (
      userTheme &&
      userTheme.darkMode !== undefined &&
      userTheme.darkMode !== null
    ) {
      setDarkMode(userTheme.darkMode);
    } else if (theme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [userTheme, theme]);

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

export default useDarkMode;
