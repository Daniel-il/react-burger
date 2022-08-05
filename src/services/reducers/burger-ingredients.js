import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
} from "../actions/burger-ingredients";

const initialState = {
  ingredients: [],
  ingredient: null,
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: true,
        
      };
    }
    default: {
      return state;
    }
  }
};
