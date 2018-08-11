import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component{
        state= {
            compponent: null
        };
        componentDidMount(){
            importComponent().then(cmp => {
                this.setState({
                    component: cmp.default
                });
            });
        };
        render () {
            const C = this.state.compponent;
            return (C ? <C {...this.props} />: null)
        }
    }
};

export default asyncComponent;