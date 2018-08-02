import React from 'react';
import Aux from '../../../hoc/Wrapper'
import classes from './Button.css';

const button = (props) => {
    return(
        <Aux>
            <button
                disabled={props.disabled}
                className={[classes.Button, classes[props.type]].join(' ')}
                onClick={props.clicked} type="button">{props.children}</button>
        </Aux>

    );
};

export default button;