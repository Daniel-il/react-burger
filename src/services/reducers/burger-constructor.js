import {
  ADD_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
  SWITCH_INGREDIENT_POSITION,
} from "../actions/burger-constructor";

const constructorInitialState = {
  constructorIngredients: {
    filling: [],
    bun: null,
  },
};

export const burgerConstructorReducer = (
  state = constructorInitialState,
  action
) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients:
          action.ingredient.type === "bun"
            ? {
                bun: action.ingredient,
                filling: [...state.constructorIngredients.filling],
              }
            : {
                ...state.constructorIngredients,
                filling: [
                  ...state.constructorIngredients.filling,
                  { ...action.ingredient, nanoId: action.id },
                ],
              }
    }
  }
    case DELETE_CONSTRUCTOR_INGREDIENT: {
      const fillings = [...state.constructorIngredients.filling];
      const deletionIngredient = fillings.indexOf(action.ingredient);
      fillings.splice(deletionIngredient, 1);
      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          filling: fillings,
        },
      };
    }
    case SWITCH_INGREDIENT_POSITION: {
      const fillings = [...state.constructorIngredients.filling];
      fillings.splice(action.to, 0, fillings.splice(action.from, 1)[0]);
      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          filling: fillings,
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};