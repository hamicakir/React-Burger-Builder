import React, { Component } from 'react';
import Aux from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends  Component{
    state = {
        ingredients: null,
        totalPrice: 1,
        isPurchaseable: false,
        purchasing:false,
        loading:false,
        error:null
    };
    componentDidMount(){
        axios.get('/ingredients.json').then(res =>{
            console.log(res);
            this.setState({
                ingredients: res.data
            })
        }).catch(error => {
            this.setState({
                error:true
            })
        });
    };
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map((igKey)=> {
            return ingredients[igKey];
        }).reduce((sum,el) =>{
            return sum + el;
        } ,0);
        console.log('Sum' + sum);
        if(sum > 0){
            this.setState({isPurchaseable: true});
        }
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        let updateIngredients = { ...this.state.ingredients };
        updateIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updateIngredients,
            totalPrice:newPrice,
        });
        this.updatePurchaseState(updateIngredients);
    };
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        let updateIngredients = { ...this.state.ingredients };
        updateIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            ingredients: updateIngredients,
            totalPrice:newPrice,
        });
        this.updatePurchaseState(updateIngredients);
    };
    purchaseHandler = () => {
        this.setState({
            purchasing:true
        });
    };
    purchaseCloseHandler = () =>{
        this.setState({
            purchasing:false
        });
    };
    purchaseContinueHandler = ()  => {
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString
        });
    };
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        let burger = this.state.error ? <p>Application is broken.</p> : <Spinner/>;

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls ingredientAdded={this.addIngredientHandler}
                                   ingredientRemoved={this.removeIngredientHandler}
                                   disabled={disabledInfo}
                                   price={this.state.totalPrice.toFixed(2)}
                                   isPurchaseable={this.state.isPurchaseable}
                                   purchaseHandler={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    cancelClick={this.purchaseCloseHandler}
                    continueClick={this.purchaseContinueHandler}
                    totalPrice={this.state.totalPrice}
                />
            );
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCloseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
export default WithErrorHandler(BurgerBuilder, axios);