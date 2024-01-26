import { Offcanvas, Nav, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { BsBoxArrowRight } from "react-icons/bs";
import Logo from "../../assets/img/logo.png";
import { NavLink } from "react-router-dom";
import { FaChartBar, FaTasks } from "react-icons/fa";
import TeamCard from "./TeamCard";
import PropTypes from "prop-types";
import "./sidebar.css";

const Sidebar = ({ show, handleClose }) => {
  const { logoutUser } = useAuth();

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
              src={Logo}
              alt="ATLogo"
              draggable="false"
              width={150}
            />
          </a>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body className="p-3">
          <Nav defaultActiveKey="/home" className="flex-column">
            <NavLink to="/" className="sidebar-link my-1">
              <h5 className="text-primary-emphasis d-flex align-items-center gap-2">
                <FaChartBar />
                Home
              </h5>
            </NavLink>
            <NavLink
              to="/events"
              className="sidebar-link my-1"
            >
              <h5 className="text-primary-emphasis d-flex align-items-center gap-2">
                <FaTasks />
                Events
              </h5>
            </NavLink>
            <hr />
            <TeamCard />
            <Button
              variant="dark"
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
