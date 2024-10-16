import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCurrentUser } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateAuthState = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch (error) {
        navigate("/login", { replace: true });
      }
    };

    validateAuthState();
  }, []);

  return isAuthenticated ? children : <CircularProgress />;
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
};
