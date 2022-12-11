import { Route, Redirect, RouteProps } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "../../services/types/hooks";
import { FC } from "../../services/types/utils";

export const ProtectedRoute: FC<RouteProps & {children?: ReactNode}> = ({
  children,
  ...rest
}) => {
  const { user, isAuth } = useSelector((store) => store.auth);

  if (!isAuth) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
