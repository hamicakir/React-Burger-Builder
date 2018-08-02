import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let validationError = null;
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        validationError = <p>Please enter a valid value!</p>
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input {...props.elementConfig}
                                  className={inputClasses.join(' ')}
                                  value={props.value}
                                  onChange={props.changed}/>;
            break;
        case('textarea'):
            inputElement = <textareaa {...props.elementConfig}
                                      className={inputClasses.join(' ')}
                                      value={props.value}
                                      onChange={props.changed}/>;
            break;
        case('select'):
            inputElement = <select className={inputClasses.join(' ')}
                                   onChange={props.changed}>
                {props.elementConfig.options.map(option => {
                    return <option key={option.value} value={option.value}>{option.displayValue}</option>
                })}
            </select>;
            break;
        default:
            inputElement = <input {...props}  className={classes.InputElement} value={props.value}/>;
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
};

export default input;