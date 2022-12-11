import { Route, Redirect } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "../../services/types/hooks";
import { FC } from "../../services/types/utils";
import { RootState } from "../../services/types";
type TProtectedRouteProps = {
  children: ReactNode;
  path: string;
  exact?: boolean;
};
export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  children,
  ...rest
}) => {
  const { user, isAuth } = useSelector((store: RootState) => store.auth);

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
