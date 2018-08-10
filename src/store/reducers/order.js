import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../utility";

const initialState = {
    orders: [],
    orderList: {},
    error:false,
    purchased:false
};
const fetchOrderSuccess = (currentState, action) => {
    return updateObject(currentState, {
        orderList: action.orders,
        error: false }
    );
};
const purchaseBurgerSuccess = (currentState, action) => {
    return updateObject(currentState, {
        error:false,
        orders:currentState.orders.concat({...action.orderData, id: action.id}),
        purchased: true
    });
};

const orderReducer = (currentState = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return updateObject(currentState, { purchased: false });
        case actionTypes.PURCHASE_BURGER_START: return updateObject(currentState, {error:true});
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(currentState, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(currentState, { error:false });
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(currentState, action);
        case actionTypes.FETCH_ORDERS_FAIL:return updateObject(currentState, {error: false});
        default: return currentState;
    }
};

export default orderReducer;