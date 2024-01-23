import { Offcanvas, Nav, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { BsBoxArrowRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../../assets/img/logo.png";
import "./Sidebar.css";

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
        <Offcanvas.Body className="p-1">
          <Nav defaultActiveKey="/home" className="flex-column">
            <NavLink
              to="/"
              className="sidebar-link d-flex flex-column align-items-center my-2 gap-4 fs-6"
            >
              <span>Home</span>
            </NavLink>
            <hr/>
            <Button
              variant="dark"
              onClick={logout}
              className="d-flex btn-sm align-items-center justify-content-center gap-2 rounded-0 mx-4"
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
