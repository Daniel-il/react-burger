const SET_INGREDIENT_MODAL = 'SET_INGREDIENT_MODAL';
const RESET_INGREDIENT_MODAL = 'RESET_INGREDIENT_MODAL';

 export function closeIngredientModal() {
  return function (dispatch) {
    dispatch({ type: RESET_INGREDIENT_MODAL });
  
 }};
  
  export function onIngredientClick(ingredient) {
    return function (dispatch) {
      dispatch({ type: SET_INGREDIENT_MODAL, currentIngredient: ingredient });
    }
  };

export {SET_INGREDIENT_MODAL, RESET_INGREDIENT_MODAL}