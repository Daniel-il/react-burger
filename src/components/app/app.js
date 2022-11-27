import { useEffect, useCallback } from "react";
import "./app";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import { ProtectedRoute } from "../protected-route/protected-route";
import { getUserData } from "../../services/actions/profile";
import { IngredientPage } from "../../pages/ingredient";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Page404 } from "../../pages/404";
import { Modal } from "../modal/modal";
import { getCookie } from "../../utils/utils";
import { FeedPage } from "../../pages/feed";
import { OrdersPage } from "../../pages/orders";
import { OrderInfo } from "../../pages/order-info";
import { OrderFull } from "../../pages/order-full";
function App() {
  const location = useLocation();
  const { background } = location.state || { location };
  const { orders } = useSelector((store) => store.ws);
  const history = useHistory();
  const closeIngredientModal = useCallback(() => {
    history.replace({ pathname: "/" });
  }, [history]);
  const closeOrderFeedModal = useCallback(() => {
    history.replace({pathname: '/feed'});
  }, [history]);

  const closeProfiledModal = useCallback(() => {
    history.replace({pathname: '/profile/orders'});
  }, [history]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getUserData());
    }
  });
  const { ingredients } = useSelector((state) => state.ingredients);
  return (
    <>
      <AppHeader />
      <Main>
        <Switch location={background || location}>
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

          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>

          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>

          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>

          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>

          <Route path="/ingredients/:id" exact={true}>
            <IngredientPage />
          </Route>

          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders" exact={true}>
            <OrdersPage />
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <OrderInfo/>
          </ProtectedRoute>

          <Route path="/feed" exact={true}>
            <FeedPage />
          </Route>

          <Route path="/feed/:id" >
          <OrderInfo />
          </Route>

          <Route>
            <Page404 />
          </Route>
        </Switch>
        {background && (
          <>
            <Route path="/ingredients/:id" exact={true}>
              <Modal title="Детали ингредиента" onClose={closeIngredientModal}>
                <IngredientDetails />
              </Modal>
            </Route>
        
        
          <Route path="/feed/:id" exact={true}>
              <Modal title="" onClose={closeOrderFeedModal}>
                <OrderInfo/>
              </Modal>
            </Route>

            <Route path="/profile/orders/:id" exact={true}>
              
                <Modal title="" onClose={closeProfiledModal}>
                  <OrderInfo/>
                </Modal>
              
            </Route>
          </>
        )}
      </Main>
    </>
  );
}

export default App;
