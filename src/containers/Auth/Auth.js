import React , { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as ActionCreator from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component{
    state= {
        controls:{
            email:{
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder: 'Email Address'
                },
                value:'',
                validation:{
                    required: true,
                    isMail: true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType: 'input',
                elementConfig:{
                    type:'password',
                    placeholder: 'Password'
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid:false,
                touched:false
            }
        },
        isSignup: true,
    };
    componentDidMount(){
        if(!this.props.isBuilding && this.props.authRedirect !== '/'){
            this.props.onSetAuthRedirect();
        }
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
    inputChangedHandler = (event, controlName) => {
        let value = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({
            controls:value
        });
    };
    submitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    };
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    };
    render() {
        const formElementArray = [];
        Object.keys(this.state.controls).map(key => {
            return formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        });
        const formInputs = formElementArray.map(input => {
            return <Input
                key={input.id}
                elementType={input.config.elementType}
                elementConfig={input.config.elementConfig}
                value={input.config.value}
                changed={(event) => this.inputChangedHandler(event, input.id)}
                invalid={!input.config.valid}
                shouldValidate={input.config.validation}
                touched={input.config.touched}
            />
        });
        return(
            <div className={classes.Auth}>
                {
                    this.props.loading ? <Spinner/> : null
                }
                {
                    this.props.isAuthenticated ? <Redirect to={this.props.authRedirect}/> : null
                }
                <form>
                    {
                        formInputs
                    }
                    { this.props.error ? <p>{this.props.error.message}</p>  : null}
                    <Button type="Success" clicked={(event) => this.submitHandler(event)}>Submit</Button>
                </form>
                <Button type="Danger"
                        clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignup ? 'Signin': 'Signup'}</Button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        isBuilding: state.burger.building,
        authRedirect: state.auth.authRedirect
    }
};
const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, method) => {dispatch(ActionCreator.auth(email, password, method))},
        onSetAuthRedirect: () => {dispatch(ActionCreator.setAuthRedirectPath('/'))}
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);