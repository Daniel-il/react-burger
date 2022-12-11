import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../types";
import { TIngredientItem } from "../types/utils";
const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";
const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";

interface IGetIngredientsAction {
  type: typeof GET_INGREDIENTS_REQUEST;
}
interface IGetIngredientsSuccessAction {
  type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: ReadonlyArray<TIngredientItem>;
}
interface IGetIngredientsFailedAction {
  type: typeof GET_INGREDIENTS_FAILED;
}
function getIngredientsAction(): IGetIngredientsAction {
  return { type: GET_INGREDIENTS_REQUEST };
}
function getIngredientsSuccessAction(
  data: ReadonlyArray<TIngredientItem>
): IGetIngredientsSuccessAction {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: data,
  };
}
function getIngredientsFailedAction(): IGetIngredientsFailedAction {
  return { type: GET_INGREDIENTS_FAILED };
}
export type TGetIngredientsActions =
  | IGetIngredientsAction
  | IGetIngredientsFailedAction
  | IGetIngredientsSuccessAction;

export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsAction())
    fetch(`${baseUrl}/ingredients`)
      .then(checkResponse)
      .then((res) => {
        dispatch(getIngredientsSuccessAction(res.data));
        console.log(res)
      })
      .catch((err) => {
        dispatch(getIngredientsFailedAction());
        console.log(err);
      });
  };
};
export {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
};
