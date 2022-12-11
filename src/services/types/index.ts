import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../..";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TPostIngredientsActions } from "../actions/order-details";
import { TGetIngredientsActions } from "../actions/burger-ingredients";
import { TAuthActions } from "../reducers/auth";
import { TWsActions } from "../actions/wsActions";
import { TModalIngredientDetailsActions } from "../actions/ingredient-details";
import { rootReducer } from "../reducers";

type TApplicationActions =
  | TAuthActions
  | TWsActions
  | TModalIngredientDetailsActions
  | TGetIngredientsActions
  | TPostIngredientsActions
  | TBurgerConstructorActions;
// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
// Типизация thunk в нашем приложении
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
