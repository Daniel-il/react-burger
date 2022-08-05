import { POST_INGREDIENTS_REQUEST, POST_INGREDIENTS_SUCCESS, POST_INGREDIENTS_FAILED } from "../actions/order-details";

const orderInitialState = {
    orderNumber: 0,
    orderRequest: false,
    orderFailed: false,
}

export const orderReducer = (state = orderInitialState, action) => {
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
            }
        }
        default: {
            return state
        }
    }
    
}