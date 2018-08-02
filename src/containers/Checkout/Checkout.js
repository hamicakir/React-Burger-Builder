import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component{
    state={
        ingredients:{
            salad:0,
            bacon:0,
            meat:1,
            cheese:0
        },
        totalPrice:0
    };
    componentDidMount(){
        console.log(this.props);
        console.log(this.props.location.search);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price= 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                price = +param[1];
            }else{
                ingredients[param[0]] = +param[1];
            }
        }
        console.log(ingredients, price);
        this.setState({
            ingredients: ingredients,
            totalPrice:  price.toFixed(2)
        })
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    };
    checkoutSuccessHandler = () => {
        this.props.history.push('/checkout/contact-data');
    };

    render(){
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelHandler={this.checkoutCancelHandler}
                    checkoutSuccessHandler={this.checkoutSuccessHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients}
                                                     totalPrice={this.state.totalPrice}
                                                     {...this.props}
                    />)}/>
            </div>

        )
    }
}

export default Checkout;