import { nanoid } from "nanoid";

const ADD_CONSTRUCTOR_INGREDIENT = "ADD_CONSTRUCTOR_INGREDIENT";
const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';
const SWITCH_INGREDIENT_POSITION = 'SWITCH_INGREDIENT_POSITION';

export const addConstructorIngredient = (ingredient) => {
  return function (dispatch) {
    dispatch({
      type: ADD_CONSTRUCTOR_INGREDIENT,
      ingredient: ingredient,
      id: nanoid(),
    });
  };
};

export const deleteConstructorIngredients = (ingredient) => {
  return function (dispatch) {
    dispatch({
      type: DELETE_CONSTRUCTOR_INGREDIENT,
      ingredient: ingredient
    });
  };
}


export const reorderIngredient = (dragIndex, hoverIndex) => {
  return function (dispatch) {
    dispatch({
      type: SWITCH_INGREDIENT_POSITION,
      from: dragIndex,
      to: hoverIndex,
    })
  }
}

export { ADD_CONSTRUCTOR_INGREDIENT, DELETE_CONSTRUCTOR_INGREDIENT, SWITCH_INGREDIENT_POSITION };
