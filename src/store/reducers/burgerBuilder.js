import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../utility";

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat: 1.3,
    bacon: 0.7
};

const initialState = {
    ingredients: null,
    error:false,
    totalPrice: 1,
};
const addIngredient = (currentState, action) => {
    return updateObject(currentState,{
        ingredients: {
            ...currentState.ingredients,
            [action.ingredientName]: currentState.ingredients[action.ingredientName] + 1
        },
        totalPrice: currentState.totalPrice + INGREDIENT_PRICES[action.ingredientName]});
};
const removeIngredient = (currentState, action) => {
    return updateObject(currentState,{ ingredients:{
            ...currentState.ingredients,
            [action.ingredientName]: currentState.ingredients[action.ingredientName] - 1
        },
        totalPrice: currentState.totalPrice - INGREDIENT_PRICES[action.ingredientName] });
};
const setIngredients = (currentState, action) => {
    return updateObject(currentState,{
        ingredients: action.ingredients,
        totalPrice: 1}
    );
};

const burgerBuilder = (currentState = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredient(currentState, action);
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredient(currentState, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(currentState, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(currentState, { error:true });
        default:
            return currentState;
    }
};

export default burgerBuilder;