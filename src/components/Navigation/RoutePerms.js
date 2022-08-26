import { Route, Redirect } from "react-router-dom";
import {getModelPermissions} from '../../services/authenticationService';

export function RoutePerms({ children, ...rest }) {
    const perms = getModelPermissions();
    const permissionGranted = perms.includes(children.type.name);

    return (
      <Route
        {...rest}
        render={({ location }) => {
          return permissionGranted === true ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: { from: location },
              }}
            />
          );
        }}
      />
    );
  }