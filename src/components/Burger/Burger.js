import React from 'react';
import classes from './Burger.css';
import BurgerIngridient from './BurgerIngridient/BurgerIngridients';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map((igKey)=>{
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngridient type={igKey} key={igKey + i}/>
        });
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please Start Adding Ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngridient type="bread-top"/>
            {
                transformedIngredients
            }
            <BurgerIngridient type="bread-bottom"/>
        </div>
    );
};


export default withRouter(burger);