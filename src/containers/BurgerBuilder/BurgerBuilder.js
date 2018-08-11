import React, { Component } from 'react';
import Aux from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as ActionCreator from '../../store/actions/index'
import { connect } from 'react-redux';



class BurgerBuilder extends  Component{
    state = {
        purchasing:false,
        loading:false,
    };
    componentDidMount(){
        this.props.onInitIngredients();
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map((igKey)=> {
            return ingredients[igKey];
        }).reduce((sum,el) =>{
            return sum + el;
        } ,0);
        return sum > 0
    }
    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({
                purchasing:true
            });
        }else{
            this.props.onSetAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
    };
    purchaseCloseHandler = () =>{
        this.setState({
            purchasing:false
        });
    };
    purchaseContinueHandler = ()  => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    };
    render(){
        const disabledInfo = {
            ...this.props.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        let burger = this.props.error ? <p>Application is broken.</p> : <Spinner/>;

        if(this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls ingredientAdded={this.props.onIngredientAdded}
                                   ingredientRemoved={this.props.onIngredientRemoved}
                                   disabled={disabledInfo}
                                   price={this.props.totalPrice.toFixed(2)}
                                   isPurchaseable={this.updatePurchaseState(this.props.ingredients)}
                                   purchaseHandler={this.purchaseHandler}
                                   isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    cancelClick={this.purchaseCloseHandler}
                    continueClick={this.purchaseContinueHandler}
                    totalPrice={this.props.totalPrice}
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
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (name) => {dispatch(ActionCreator.addIngredient(name))},
        onIngredientRemoved: (name) => {dispatch(ActionCreator.removeIngredient(name))},
        onInitIngredients: () => {dispatch(ActionCreator.initIngredients())},
        onPurchaseInit: () => dispatch(ActionCreator.purchaseInit()),
        onSetAuthRedirect: (path) => {dispatch(ActionCreator.setAuthRedirectPath(path))}
    }
};
const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        error: state.burger.error,
        isAuthenticated: state.auth.token !== null
    }
};
export default  connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));