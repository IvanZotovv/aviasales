import React from "react";
import ReactDom from 'react-dom';
import App from './App';
import './index.scss';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from "redux";
import {listReducer} from "./actions/reducers";
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";

const reducer = combineReducers({
    list: listReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
