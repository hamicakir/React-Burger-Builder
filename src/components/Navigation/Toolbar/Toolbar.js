import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return (
        <div>
            <header className={classes.Toolbar}>
                <DrawerToggle openHandler={props.openHandler}/>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems/>
                </nav>
            </header>
        </div>

    )
};

export default toolbar;