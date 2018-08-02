import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:"Salad", type: 'salad'},
    {label:"Bacon", type: 'bacon'},
    {label:"Cheese", type: 'cheese'},
    {label:"Meat", type: 'meat'},
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price}</strong></p>
            {
                controls.map( (el) => {
                    return <BuildControl label={el.label}
                                         added={() => props.ingredientAdded(el.type)}
                                         removed={() => props.ingredientRemoved(el.type)}
                                         key={el.label}
                                         disabled={props.disabled[el.type]}
                            />
                })
            }
            <button className={classes.OrderButton}
                    disabled={!props.isPurchaseable}
                    onClick={props.purchaseHandler}
            >Order Now</button>
        </div>
    )
};

export default buildControls;