import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  const { hasPermissions, loading, isAuthenticated } = authContext;

  return (
    <Route
      {...rest}
      render={props =>
        !hasPermissions && !loading && !isAuthenticated ? (
          <Redirect to="/login"></Redirect>
        ) : (
          <Component {...props}></Component>
        )
      }
    ></Route>
  );
};

export default AdminRoute;
