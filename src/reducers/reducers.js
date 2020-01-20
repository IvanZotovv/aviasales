import {
    ADD_ITEMS,
    FAST_FLIGHT,
    LOWER_PRICE,
    SET_FILTER
} from "../action/actionType";
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {createStore, applyMiddleware, combineReducers} from "redux";





export const listReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEMS: {
            return  [
                ...state,
                ...action.payload,
            ]
        }

        case LOWER_PRICE: {
            return state.sort((a, b) => a.price > b.price ? 1 : -1);
        }

        case FAST_FLIGHT: {
            return state.sort((a, b) => {
                const first = a.segments[0].duration;
                const second = b.segments[0].duration;
                return first > second ? 1 : -1
            });
        }

        case SET_FILTER: {
            return state.map(i => {
                if(action.payload.length === 0){
                    i.hide = false;                 
                }
                action.payload.some(item => {
                    const item1 = parseInt(item)
                    if(i.segments[0].stops.length === item1 || item === 'all') {
                        i.hide = false;

                        return true;
                    }
                    i.hide = true;

                    return false;
                })
                return i;
            })
        }
        default:
            return state;
    }
}

const reducer = combineReducers({
    list: listReducer
})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))