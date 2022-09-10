import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";


export function ProtectedRoute({ children, ...rest }) {
    const {user, isAuth} = useSelector(store => store.auth)

    const location = useLocation();
    if (!isAuth) {
      return null
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
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }