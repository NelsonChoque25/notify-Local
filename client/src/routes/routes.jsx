import { Route, Routes, Navigate } from "react-router-dom";
import RouteTransition from "../utils/RouteTransition";
import NotFound from "../components/NotFound/NotFound";
import Events from "../components/Events/Events";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";

const AppRoutes = () => (
  <Routes>
    <Route
      path="/login"
      element={
        <RouteTransition>
          <Login />
        </RouteTransition>
      }
    />
    <Route element={<ProtectedRoute />}>
      <Route
        path="/"
        element={
          <RouteTransition>
            <Home />
          </RouteTransition>
        }
      />
      <Route
        path="/events"
        element={
          <RouteTransition>
            <Events />
          </RouteTransition>
        }
      />
      <Route
        path="*"
        element={
          <RouteTransition>
            <NotFound />
          </RouteTransition>
        }
      />
    </Route>
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
