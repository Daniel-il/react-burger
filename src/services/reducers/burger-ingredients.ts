import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  TGetIngredientsActions,
} from "../actions/burger-ingredients";
import { TIngredientItem } from "../types/utils";

type TIngredientsState = {
  ingredients: ReadonlyArray<TIngredientItem>;
  ingredient: TIngredientItem | null;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};
const initialState: TIngredientsState = {
  ingredients: [],
  ingredient: null,
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action: TGetIngredientsActions): TIngredientsState => {
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
