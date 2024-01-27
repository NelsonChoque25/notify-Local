import { useLocation } from "react-router-dom";
import Header from "../header/Header";
import PropTypes from "prop-types";

const CustomHeader = ({
  handleShow,
  handleClose,
  darkMode,
  toggleDarkMode,
}) => {
  const location = useLocation();

  if (location.pathname === "/login") {
    return null;
  }

  return (
    <Header
      handleShow={handleShow}
      handleClose={handleClose}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
    />
  );
};

CustomHeader.propTypes = {
  handleShow: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default CustomHeader;
