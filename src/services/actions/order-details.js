import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";

const POST_INGREDIENTS_SUCCESS = "POST_INGREDIENTS_SUCCESS";
const POST_INGREDIENTS_FAILED = "POST_INGREDIENTS_FAILED";
const POST_INGREDIENTS_REQUEST = "POST_INGREDIENTS_REQUEST";

export const postIngredientsToServer = (ids) => {
  return function (dispatch) {
    dispatch({
      type: POST_INGREDIENTS_REQUEST,
    });
    fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ids,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: POST_INGREDIENTS_SUCCESS,
          orderNumber: res.order.number,
        });
      })
      .catch((err) => {
        dispatch({
            type: POST_INGREDIENTS_FAILED,
        })
        console.log(err)
      })
      ;
  };
};
export {
  POST_INGREDIENTS_SUCCESS,
  POST_INGREDIENTS_FAILED,
  POST_INGREDIENTS_REQUEST,
};
