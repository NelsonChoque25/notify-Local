import DarkModeContext from "../contexts/DarkModeContext";
import { useAuth } from "../contexts/AuthContext";
import CustomHeader from "./header/CustomHeader";
import { ToastContainer } from "react-toastify";
import useDarkMode from "../hooks/useDarkMode";
import { Container } from "react-bootstrap";
import Sidebar from "./sidebar/Sidebar";
import AppRoutes from "../routes/Routes";
import { useState } from "react";

const Layout = () => {
  const [show, setShow] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { updateThemeUser } = useAuth();

  const toggleDarkMode = async () => {
    const newMode = !darkMode;

    try {
      await updateThemeUser(newMode);
      setDarkMode(newMode);

      console.log("Tema actualizado", newMode);
    } catch (error) {
      console.error("Error al actualizar el tema:", error);
    }
  };

  return (
    <DarkModeContext.Provider value={darkMode}>
      <ToastContainer
        position="top-center"
        theme={darkMode ? "dark" : "light"}
      />
      <CustomHeader
        handleShow={handleShow}
        handleClose={handleClose}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <Container fluid>
        <Sidebar show={show} handleClose={handleClose} />
        <AppRoutes />
      </Container>
    </DarkModeContext.Provider>
  );
};

export default Layout;
