import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as ActionCreator from '../../store/actions/index';

class Orders extends Component{
    state={
        loading:true
    };
    componentDidMount(){
        this.props.onOrdersFetchStart();
    };
    getOneOrder = (name) => {
        console.log(name);
        axios.get(`/order/${name}`).then(res => {
            console.log(res);
        })
    };
    render(){
        console.log(this.props.orderList);
        return (
            <div className={classes.Orders}>
                {
                    this.props.error ? <Spinner/> :
                        <div>
                            {Object.keys(this.props.orderList).map((order)=> {
                                return (
                                    <Order
                                        key={order}
                                        name={order}
                                        price={parseFloat(this.props.orderList[order].price).toFixed(2)}
                                        ingredients={this.props.orderList[order].ingredients}
                                        onClick={this.getOneOrder}
                                    />
                                )
                            })}
                        </div>
                }
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orderList: state.order.orderList,
        error: state.order.error
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onOrdersFetchStart: () => dispatch(ActionCreator.fetchOrderStart())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));