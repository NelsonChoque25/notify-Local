import DarkModeContext from "../../contexts/DarkModeContext";
import { Offcanvas, Nav, Button } from "react-bootstrap";
import { FaChartBar, FaTasks } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import LogoDark from "../../assets/img/logo_dark.png";
import { BsBoxArrowRight } from "react-icons/bs";
import Logo from "../../assets/img/logo.png";
import { useContext } from "react";

import { NavLink } from "react-router-dom";

import TeamCard from "./TeamCard";
import PropTypes from "prop-types";
import "./Sidebar.css";

const Sidebar = ({ show, handleClose }) => {
  const { logoutUser } = useAuth();
  const darkMode = useContext(DarkModeContext);

  const logout = async () => {
    try {
      await logoutUser();
      handleClose();
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  return (
    <div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={true}
        className="offcanvas sidebar shadow-sm"
      >
        <Offcanvas.Header closeButton>
          <a
            className="d-flex justify-content-center"
            href="/"
            data-mdb-ripple-color="primary"
          >
            <img
              id="at-logo"
              src={darkMode ? LogoDark : Logo}
              alt="ATLogo"
              draggable="false"
              width={150}
            />
          </a>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body className="p-2">
          <Nav defaultActiveKey="/home" className="flex-column">
            <h6 className="sidebar-header">
              Admin Elements
            </h6>
            <NavLink to="/" className="sidebar-link my-1">
              <h6 className="d-flex align-items-center gap-2">
                <FaChartBar />
                Home
              </h6>
            </NavLink>
            <NavLink to="/events" className="sidebar-link my-1">
              <h6 className="d-flex align-items-center gap-2">
                <FaTasks />
                Events
              </h6>
            </NavLink>
            <hr />
            <h6 className="sidebar-header">
              Users Managment
            </h6>
            <hr />
            <TeamCard />
            <Button
              onClick={logout}
              className="d-flex btn-sm align-items-center justify-content-center gap-2 mx-3"
            >
              <BsBoxArrowRight /> Log Out
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

Sidebar.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Sidebar;
