import React, { Component } from 'react';
import Classes from './BurgerIngridient.css';
import PropTypes from 'prop-types';

class BurgerIngridient extends Component{
    render(){
        let ingridient = null;
        switch (this.props.type){
            case('bread-bottom'):
                ingridient = <div className={Classes.BreadBottom}></div>;
                break;
            case('bread-top'):
                ingridient = <div className={Classes.BreadTop}>
                    <div className={Classes.Seeds1}></div>
                    <div className={Classes.Seeds2}></div>
                </div>;
                break;
            case('meat'):
                ingridient = <div className={Classes.Meat}></div>;
                break;
            case('salad'):
                ingridient = <div className={Classes.Salad}></div>;
                break;
            case('cheese'):
                ingridient = <div className={Classes.Cheese}></div>
                break;
            case('bacon'):
                ingridient = <div className={Classes.Bacon}></div>
                break;
            default:
                ingridient = null;
                break;
        }
        return ingridient;
    }


}
BurgerIngridient.propTypes ={
    type: PropTypes.string.isRequired,
};

export default BurgerIngridient;