import {
  SET_INGREDIENT_MODAL,
  RESET_INGREDIENT_MODAL,
} from "../actions/ingredient-details";

const initialIngredientDetailsState = {
  ingredienInModal: null,
};

export const ingredientDetailsReducer = (state = initialIngredientDetailsState, action) => {
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
      return { ...state };
    }
  }
};
