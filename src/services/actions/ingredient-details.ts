import { AppDispatch } from "../types";
import { TIngredientItem } from "../types/utils";

const SET_INGREDIENT_MODAL: "SET_INGREDIENT_MODAL" = "SET_INGREDIENT_MODAL";
const RESET_INGREDIENT_MODAL: "RESET_INGREDIENT_MODAL" =
  "RESET_INGREDIENT_MODAL";

interface ISetIngredientModalAction {
  currentIngredient: TIngredientItem | null;
  type: typeof SET_INGREDIENT_MODAL;
}

interface IResetIngredientModal {
  type: typeof RESET_INGREDIENT_MODAL;
}

export type TModalIngredientDetailsActions =
  | ISetIngredientModalAction
  | IResetIngredientModal;

export function closeIngredientModal(): IResetIngredientModal {
  return ({ type: RESET_INGREDIENT_MODAL });
}

export function onIngredientClick(ingredient: TIngredientItem): ISetIngredientModalAction {
  return  {
    type: SET_INGREDIENT_MODAL, currentIngredient: ingredient,
  };
}

export { SET_INGREDIENT_MODAL, RESET_INGREDIENT_MODAL };
