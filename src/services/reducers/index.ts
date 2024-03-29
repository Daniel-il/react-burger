import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderReducer } from './order-details';
import { authReducer } from './auth';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer,
    burgerConstructorIngredients: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderReducer,
    ws: wsReducer,
    auth: authReducer,
})