import { Container, Nav, Navbar, NavDropdown, Form } from "react-bootstrap";
import { FaBell, FaSun, FaMoon } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/img/logo.jpg";
import { BiMenu } from "react-icons/bi";
import PropTypes from "prop-types";
import "./Header.css";

const Topbar = ({ handleShow, handleClose, darkMode, toggleDarkMode }) => {
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
    <Navbar className="shadow">
      <Container fluid>
        {/* Right Items */}
        <Navbar.Brand href="/" className="mx-2">
          <img
            alt="Logo"
            src={Logo}
            width="40"
            className="d-inline-block align-top rounded-3 me-3 shadow-sm"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#" onClick={handleShow}>
            <BiMenu size={25} />
          </Nav.Link>
        </Nav>
        {/* Left Items */}
        <Nav className="align-items-center fs-5">
          <Nav.Item className="mx-2">
            <Form>
              <Form.Check
                className="custom-switch"
                type="switch"
                id="custom-switch"
                checked={darkMode}
                onChange={toggleDarkMode}
                label={
                  darkMode ? (
                    <FaMoon className="text-light" />
                  ) : (
                    <FaSun className="text-warning" />
                  )
                }
              />
            </Form>
          </Nav.Item>
          <Nav.Link href="#" className="mx-2">
            <FaBell />
          </Nav.Link>
          <hr className="vertical-divider me-2" />
          <NavDropdown
            align="end"
            title={
              <img
                src="https://picsum.photos/200"
                className="rounded-circle"
                width="30"
              />
            }
            className="mx-2 custom-nav-dropdown"
            style={{ color: "#000" }}
          >
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Config</NavDropdown.Item>
            <NavDropdown.Divider /> {/* Separador aquí */}
            <NavDropdown.Item href="#action/3.4" onClick={logout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

Topbar.propTypes = {
  handleShow: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Topbar;
