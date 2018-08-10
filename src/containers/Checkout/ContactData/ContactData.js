import React , { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import * as ActionCreators from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {
    state={
        orderForm:{
            name:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation:{
                    required: true,
                    valueType: 'name'
                },
                valid:false,
                touched:false
            },
            email:{
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder: 'Your Email'
                },
                value:'',
                validation:{
                    required: true,
                    valueType: 'email address'
                },
                valid:false,
                touched:false
            },
            street:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Your Street'
                },
                value:'',
                validation:{
                    required: true,
                    valueType: 'street'
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'ZIP Code'
                },
                value:'',
                validation:{
                    required: true,
                    minLength:5,
                    maxLength:5,
                    valueType: 'ZIP code'
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Country'
                },
                value:'',
                validation:{
                    required: true,
                    valueType: 'country'
                },
                valid:false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                    options:[
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value:'fastest',
                validation:{},
                valid:true
            },
        },
        formIsValid: false,
    };
    componentDidMount(){
        console.log(this.props);
    }
    checkValidity(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    orderSubmitHandler = () => {
        console.log(this.props.ingredients);
        //alert('You Continue');
        this.setState({loading:true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        console.log(formData);
        const orderData = {
            price:this.props.totalPrice,
            ingredients: this.props.ingredients,
            contactData: formData
        };
        console.log(orderData);
        if(this.state.formIsValid){
            this.props.onPurchaseBurgerStart(orderData);
        }
    };
    inputChangedHandler = (event, inputIdentifier) => {
        let value = {...this.state.orderForm};
        value[inputIdentifier].value = event.target.value;
        value[inputIdentifier].valid = this.checkValidity(value[inputIdentifier].value, value[inputIdentifier].validation);
        value[inputIdentifier].touched= true;
        let formIsValid = true;
        for(let inputIdentifier in value){
            formIsValid = value[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            orderForm: value,
            formIsValid: formIsValid
        });
        console.log(this.state.orderForm[inputIdentifier]);
        console.log(this.state.orderForm[inputIdentifier].value);
    };
    render(){
        let formElementsArray = [];
        for( let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>{
                this.props.error ? <Spinner/> :   <form>
                    {formElementsArray.map(formelement => {
                        return <Input key={formelement.id}
                                      elementType={formelement.config.elementType}
                                      elementConfig={formelement.config.elementConfig}
                                      value={formelement.config.value}
                                      changed={(event) => this.inputChangedHandler(event, formelement.id)}
                                      invalid={!formelement.config.valid}
                                      shouldValidate={formelement.config.validation}
                                      touched={formelement.config.touched}
                        />
                    })}
                    <Button type="Success"
                            clicked={this.orderSubmitHandler}
                            disabled={!this.state.formIsValid}
                    >Order</Button>
                </form>
            }

            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        error: state.order.error
    }
};
const mapDispatchToProps = dispatch => {
    return{
        onPurchaseBurgerStart: (orderData) => { dispatch(ActionCreators.purchaseBurger(orderData)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));