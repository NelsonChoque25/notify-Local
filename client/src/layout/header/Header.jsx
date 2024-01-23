import { Container, Nav, Navbar, NavDropdown  } from "react-bootstrap";
import Logo from "../../assets/img/logo.jpg";
import { FaBell } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import PropTypes from "prop-types";

const Header = ({ handleShow }) => {
  return (
    <Navbar className="bg-body-tertiary shadow-sm" expand="lg">
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
        <Nav className="justify-content-end fs-6">
          <Nav.Link href="#">
            <FaBell />
          </Nav.Link>
          <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  handleShow: PropTypes.func.isRequired,
};

export default Header;
