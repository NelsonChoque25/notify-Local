/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import { getTheme, updateTheme } from "../api/users";
import * as authAPI from "../api/authAPI";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import cookie from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userTheme, setUserTheme] = useState(null);

  const authenticateUser = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const loginUser = async (email, password) => {
    try {
      const data = await authAPI.login(email, password);
      if (data) {
        authenticateUser(data);
        toast.success("¡Bienvenido de nuevo!");
      }
    } catch (error) {
      toast.error("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      console.error("Error during login", error);
    }
  };

  const logoutUser = async () => {
    try {
      await authAPI.logout();
      cookie.remove("token");
      setCurrentUser(null);
      setIsAuthenticated(false);
      toast.success("¡Hasta pronto!");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
      toast.error("Error al cerrar sesión. Por favor, inténtalo de nuevo.");
    }
  };

  const updateThemeUser = async (theme) => {
    if (!currentUser || !currentUser.userId) return;
    try {
      await updateTheme(currentUser.userId, theme);
      setUserTheme(theme);
    } catch (error) {
      console.error(`Error al actualizar el tema: ${error.message}`);
      toast.error("Error al actualizar el tema");
    }
  };

  useEffect(() => {
    async function checkLoginStatus() {
      const cookies = cookie.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setCurrentUser(null);
      }

      try {
        const res = await authAPI.verifyToken(cookies.token);
        if (!res.success) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setCurrentUser(res);
        setLoading(false);

        const theme = await getTheme(res.userId);
        setUserTheme(theme);

        console.log("theme", theme);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setCurrentUser(null);
        setLoading(false);
      }
    }

    checkLoginStatus();
  }, []);

  const value = {
    currentUser,
    setCurrentUser: authenticateUser,
    loginUser,
    logoutUser,
    isAuthenticated,
    loading,
    userTheme,
    updateThemeUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
