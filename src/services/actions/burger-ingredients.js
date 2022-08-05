import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';


export function getIngredients() {
    return function(dispatch) {
      dispatch({
        type: GET_INGREDIENTS_REQUEST
      });
      fetch(`${baseUrl}/ingredients`)
      .then(checkResponse)
      .then(res => {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          })
        })
        .catch(err => {
          dispatch({
            type:GET_INGREDIENTS_FAILED
          })
          console.log(err)
        })
    };
  }
export {GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST }