import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerStart = () => {
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
};
export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/order.json', orderData).then(res => {
            console.log(res);
            dispatch(purchaseBurgerSuccess(res.data.name, orderData));
        }).catch(error => {
            console.log(error);
            dispatch(purchaseBurgerFail(error));
        });
    }
};

export const  purchaseBurgerSuccess = (id, orderData) => {
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};
export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};
export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    }
};
export const fetchOrderStart = () => {
    return dispatch => {
        axios.get('/order.json').then(res => {
            console.log(res);
            dispatch(fetchOrderSuccess(res.data));
        }).catch(error => {
            dispatch(fetchOrderFail(error));
        });
    }
};
export const fetchOrderSuccess = (orders) => {
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
};
export const fetchOrderFail = (error) => {
    return{
        type:actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};
