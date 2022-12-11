import { baseUrl } from "../../utils/constants";
import { checkResponse, getCookie } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../types";
const POST_INGREDIENTS_SUCCESS: "POST_INGREDIENTS_SUCCESS" =
  "POST_INGREDIENTS_SUCCESS";
const POST_INGREDIENTS_FAILED: "POST_INGREDIENTS_FAILED" =
  "POST_INGREDIENTS_FAILED";
const POST_INGREDIENTS_REQUEST: "POST_INGREDIENTS_REQUEST" =
  "POST_INGREDIENTS_REQUEST";
const POST_INGREDIENTS_REFRESH: "POST_INGREDIENTS_REFRESH" =
  "POST_INGREDIENTS_REFRESH";

interface IPostIngredientsAction {
  type: typeof POST_INGREDIENTS_REQUEST;
}
interface IPostIngredientsSuccessAction {
  type: typeof POST_INGREDIENTS_SUCCESS;
  orderNumber: number;
}
interface IPostIngredientsFailedAction {
  type: typeof POST_INGREDIENTS_FAILED;
}
interface IPostIngredientsRefreshAction {
  type: typeof POST_INGREDIENTS_REFRESH;
}
function postingredientsSuccessAction(
  data: number
): IPostIngredientsSuccessAction {
  return { type: POST_INGREDIENTS_SUCCESS, orderNumber: data };
}
function postingredientsFailedAction(): IPostIngredientsFailedAction {
  return {
    type: POST_INGREDIENTS_FAILED,
  };
}
function postIngtredientsAction(): IPostIngredientsAction {
  return {
    type: POST_INGREDIENTS_REQUEST,
  };
}
export type TPostIngredientsActions =
  | IPostIngredientsAction
  | IPostIngredientsFailedAction
  | IPostIngredientsRefreshAction
  | IPostIngredientsSuccessAction;
export const postIngredientsToServer: AppThunk = (ids: Array<string> ) =>  (dispatch: AppDispatch) =>{
    dispatch(postIngtredientsAction());
    fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify({
        ingredients: ids,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        dispatch(postingredientsSuccessAction(res.order.number));
      })
      .catch((err) => {
        dispatch(postingredientsFailedAction());
        console.log(err);
      });
};
export {
  POST_INGREDIENTS_SUCCESS,
  POST_INGREDIENTS_FAILED,
  POST_INGREDIENTS_REQUEST,
  POST_INGREDIENTS_REFRESH,
};
