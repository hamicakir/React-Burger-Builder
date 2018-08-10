import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import { connect } from 'react-redux';
import * as ActionCreators from '../../store/actions/index';

class Checkout extends Component{
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    };
    checkoutSuccessHandler = () => {
        this.props.history.push('/checkout/contact-data');
    };
    render(){
        let summary = <Redirect to="/"/>;
        if(this.props.ingredients){
            if(this.props.purchased){
                summary = <Redirect to="/"/>
            }else{
                summary = (
                    <div>
                        <CheckoutSummary
                            ingredients={this.props.ingredients}
                            checkoutCancelHandler={this.checkoutCancelHandler}
                            checkoutSuccessHandler={this.checkoutSuccessHandler}
                        />
                        <Route
                            path={this.props.match.path + '/contact-data'}
                            component={ContactData}
                        />
                    </div>
                );
            }
        }
        return (
            <div>
                {
                    summary
                }
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        purchased: state.order.purchased
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onPurchaseInit: () => { dispatch(ActionCreators.purchaseInit()) }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);