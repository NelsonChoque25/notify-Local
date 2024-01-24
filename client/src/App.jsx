import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import Sidebar from './layout/sidebar/Sidebar';
import Header from './layout/header/Header';
import { Container } from 'react-bootstrap';
import AppRoutes from './routes/routes';
import { useState } from 'react';
import './App.css';

const Layout = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();

  return (
    <AuthProvider>
      {location.pathname !== "/login" && <Header handleShow={handleShow} handleClose={handleClose} />}
      <Container fluid>
          {location.pathname !== "/login" && <Sidebar show={show} handleClose={handleClose} />}
          <AppRoutes />
      </Container>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer 
      position="top-center"
      theme="dark"/>
      <Layout />
    </BrowserRouter>
  );
};

export default App;

