import {
  SET_INGREDIENT_MODAL,
  RESET_INGREDIENT_MODAL,
  TModalIngredientDetailsActions,
} from "../actions/ingredient-details";
import { TIngredientItem } from "../types/utils";

type TIngredientDetailsState = {
  ingredientInModal: TIngredientItem | null;
}
const initialIngredientDetailsState: TIngredientDetailsState = {
  ingredientInModal: null,
};


export const ingredientDetailsReducer = (state = initialIngredientDetailsState, action: TModalIngredientDetailsActions): TIngredientDetailsState => {
  switch (action.type) {
    case SET_INGREDIENT_MODAL: {
      return {
        ingredientInModal: action.currentIngredient,
      };
    }
    case RESET_INGREDIENT_MODAL: {
      return {
        ingredientInModal: null,
      };
    }
    default: {
      return state;
    }
  }
};
