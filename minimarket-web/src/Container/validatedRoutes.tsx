import React, { useContext } from "react";
import { Route } from "react-router";

export const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
        <Component {...props} />
    }
  />
);