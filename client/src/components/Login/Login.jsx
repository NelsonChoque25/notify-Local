import { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { useForm } from "react-hook-form";
import "./Login.css";


const Login = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const onSubmit = async (data) => {
    const { email, password } = data;
    await loginUser(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8} lg={6} className="w-100">
          <img
            className="my-5 logo-login"
            src={Logo}
            alt="Logo"
          />
          <Card className="login-card rounded-5 shadow">
            <Card.Header className="header-login fs-2 text-center fw-bold">
              Log In
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    autoFocus
                    {...register("email", {
                      required: "El correo es requerido",
                    })}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-5">
                  <div className="float-end">
                    <small>
                      <a href="#" className="blue">
                        Olvidaste tu contraseña
                      </a>
                    </small>
                  </div>
                  <Form.Label>Contraseña</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "La contraseña es requerida",
                      })}
                    />
                    <div
                      className="input-group-text"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                  </div>
                  {errors.password && (
                    <span className="text-danger">
                      {errors.password.message}
                    </span>
                  )}
                </Form.Group>
                <Button
                  className="mb-3 btn-lg d-block w-100 rounded-5"
                  variant="primary"
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
