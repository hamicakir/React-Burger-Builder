import React, { Component } from 'react';
import Classes from './Layout.css';
import Aux from '../Wrapper';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Layout extends Component {
    state={
        showSideDrawer:false,
    };
    sideDrawerToggleHandler = () => {
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    };
    render(){
        return (
            <Aux>
                <Toolbar
                    openHandler={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerToggleHandler}/>
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};
const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token
    }
};
export default  withRouter(connect(mapStateToProps)(Layout));