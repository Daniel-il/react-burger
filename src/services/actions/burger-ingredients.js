import { ingredientsUrl } from "../../utils/constants";

const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';


export function getIngredients() {
    return function(dispatch) {
      dispatch({
        type: GET_INGREDIENTS_REQUEST
      });
      fetch(ingredientsUrl)
      .then(res => res.json())
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      });
    };
  }
export {GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST }