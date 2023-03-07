import { POST_INGREDIENTS_REQUEST, POST_INGREDIENTS_SUCCESS, POST_INGREDIENTS_FAILED, POST_INGREDIENTS_REFRESH, TPostIngredientsActions } from "../actions/order-details";

type TOrderState = {
    orderNumber: number | null;
    orderRequest: boolean;
    orderFailed: boolean;
}
const orderInitialState: TOrderState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
}

export const orderReducer = (state = orderInitialState, action: TPostIngredientsActions): TOrderState => {
    switch(action.type) {
        case POST_INGREDIENTS_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case POST_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
                orderNumber: action.orderNumber
            }
        }
        case POST_INGREDIENTS_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
                orderNumber: 0,
            }
        }
        case POST_INGREDIENTS_REFRESH: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: false,
                orderNumber: null
            }
        }
        default: {
            return state
        }
    }
    
}