import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/img/logo.jpg";
import { FaBell } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import PropTypes from "prop-types";

const Header = ({ handleShow, handleClose }) => {

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
        <Nav className=" align-items-center fs-5">
          <Nav.Link href="#">
            <FaBell />
          </Nav.Link>
          <NavDropdown
            align="end"
            title={
              <img
                src="https://picsum.photos/200"
                className="rounded-circle"
                width="30"
              />
            }
            className="me-2"
            style={{ color: "#000" }}
          >
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Config </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4" onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  handleShow: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Header;
