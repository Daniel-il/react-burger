import { orderUrl } from "../../utils/constants";

const POST_INGREDIENTS_SUCCESS = "POST_INGREDIENTS_SUCCESS";
const POST_INGREDIENTS_FAILED = "POST_INGREDIENTS_FAILED";
const POST_INGREDIENTS_REQUEST = "POST_INGREDIENTS_REQUEST";

export const postIngredientsToServer = (ids) => {
  return function (dispatch) {
    dispatch({
      type: POST_INGREDIENTS_REQUEST,
    });
    fetch(orderUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ids,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
            dispatch({
                type: POST_INGREDIENTS_FAILED
            })
            return Promise.reject(`Ошибка ${res.status}`);
          }
      })
      .then((res) => {
          dispatch({
            type: POST_INGREDIENTS_SUCCESS,
            orderNumber: res.order.number,
          });
      })
      .catch((err) => console.log(err));
  };
};
export {
  POST_INGREDIENTS_SUCCESS,
  POST_INGREDIENTS_FAILED,
  POST_INGREDIENTS_REQUEST,
};
