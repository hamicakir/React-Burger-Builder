import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import auth from "./store/reducers/auth";

const composeEnhancers = process.env.NODE_ENV === "development" ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose: null;

const rootReducer = combineReducers({
    burger:burgerBuilderReducer,
    order:orderReducer,
    auth:auth
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
