import { useEffect } from "react";
import "./app";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {LoginPage} from '../pages/login';
import {RegisterPage} from '../pages/register';
import {ForgotPasswordPage} from '../pages/forgot-password';
import {ResetPasswordPage} from '../pages/reset-password';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  const { ingredients } = useSelector((state) => state.ingredients);
  return (
    <> 
      <AppHeader />
      <Main>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <DndProvider backend={HTML5Backend}>
                {ingredients && (
                  <>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </>
                )}
            </DndProvider>
          </Route>
          <Route path='/login' exact={true}>
            <LoginPage />
          </Route>
          <Route path='/register' exact={true}>
            <RegisterPage />
          </Route>
          <Route path='/forgot-password' exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path='/reset-password' exact={true}>
            <ResetPasswordPage />
          </Route>
        </Switch>
        </Router>
      </Main>
    </>
  );
}

export default App;
