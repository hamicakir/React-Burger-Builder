import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state={
        orderList:{},
        loading:true
    };
    componentDidMount(){
        axios.get('/order.json').then(res => {
            console.log(res);
            this.setState({
                orderList: res.data,
                loading:false
            });
        }).catch(error => {

        });
    };
    getOneOrder = (name) => {
        console.log(name);
        axios.get(`/order/${name}`).then(res => {
            console.log(res);
        })
    };
    render(){
        return (
            <div className={classes.Orders}>
                {
                    this.state.loading ? <Spinner/> :
                        <div>
                            {Object.keys(this.state.orderList).map((order)=> {
                                return (
                                    <Order
                                        key={order}
                                        name={order}
                                        price={parseFloat(this.state.orderList[order].price).toFixed(2)}
                                        ingredients={this.state.orderList[order].ingredients}
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

export default withErrorHandler(Orders, axios);