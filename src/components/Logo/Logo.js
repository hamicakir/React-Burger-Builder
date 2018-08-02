import React from 'react';
import Logo from '../../assets/burger-logo.png'
import classes from './Logo.css';

const logo = (props) => {
    return(
        <div className={classes.Logo}>
            <img src={Logo} />
        </div>
    );

};

export default logo;