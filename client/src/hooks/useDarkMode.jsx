import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";

const useDarkMode = () => {
  const { userTheme } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (userTheme && userTheme.darkMode !== undefined && userTheme.darkMode !== null) {
      setDarkMode(userTheme.darkMode);
    }
  }, [userTheme]);

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

export default useDarkMode;