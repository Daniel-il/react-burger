import { nanoid } from "nanoid";
import { AppDispatch, AppThunk } from "../types";
import { TIngredientItem } from "../types/utils";

const ADD_CONSTRUCTOR_INGREDIENT: "ADD_CONSTRUCTOR_INGREDIENT" =
  "ADD_CONSTRUCTOR_INGREDIENT";
const DELETE_CONSTRUCTOR_INGREDIENT: "DELETE_CONSTRUCTOR_INGREDIENT" =
  "DELETE_CONSTRUCTOR_INGREDIENT";
const SWITCH_INGREDIENT_POSITION: "SWITCH_INGREDIENT_POSITION" =
  "SWITCH_INGREDIENT_POSITION";

interface IAddConstructorIngredientAction {
  type: typeof ADD_CONSTRUCTOR_INGREDIENT;
  ingredient: TIngredientItem;
  id: string;
}
interface IDeleteConstructorIngredientAction {
  type: typeof DELETE_CONSTRUCTOR_INGREDIENT;
  ingredient: TIngredientItem;
}
interface ISwitchIngredientPositionAction {
  type: typeof SWITCH_INGREDIENT_POSITION;
  from: number;
  to: number;
}
export type TBurgerConstructorActions =
  | IAddConstructorIngredientAction
  | IDeleteConstructorIngredientAction
  | ISwitchIngredientPositionAction;

export const addConstructorIngredient = (
  ingredient: TIngredientItem
): IAddConstructorIngredientAction => {
  return {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    ingredient: ingredient,
    id: nanoid(),
  };
};

export const deleteConstructorIngredients = (
  ingredient: TIngredientItem
): IDeleteConstructorIngredientAction => {
  return {
    type: DELETE_CONSTRUCTOR_INGREDIENT,
    ingredient: ingredient,
  };
};

export const reorderIngredient = (dragIndex: number, hoverIndex: number) => {
  return {
    type: SWITCH_INGREDIENT_POSITION,
    from: dragIndex,
    to: hoverIndex,
  };
};

export {
  ADD_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
  SWITCH_INGREDIENT_POSITION,
};
