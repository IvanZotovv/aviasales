import {
    ADD_ITEMS,
    ALL,
    FAST_FLIGHT,
    LOWER_PRICE,
    ONE_TRANSPLANT, THREE_TRANSPLANT,
    TWO_TRANSPLANT,
    WITHOUT_TRANSPLANT,
    REMOVE_ALL
} from "../action/actionType";

export const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEMS: {
            return  [
                ...state,
                action.payload
            ]
        }
        case LOWER_PRICE: {
            const filteredArr = [...new Set(state)].sort((a, b) => {
                if(a.price > b.price) {
                    return 1
                }
                if(a.price < b.price) {
                    return -1
                }
                return 0
            });

            return filteredArr

        }
        case FAST_FLIGHT: {
            const filteredFlightTime = [...new Set(state)].sort((a, b) => {
                const first = a.segments[0].duration;
                const second = b.segments[0].duration;
                if (first > second) {
                    return 1;
                }
                if (first < second) {
                    return -1;
                }
                return 0;
            });

            return [
                ...filteredFlightTime
            ]
        }

        case ALL: {
            console.log(state)
            return state
        }
        case WITHOUT_TRANSPLANT: {
            return state.filter(i => i.segments[0].stops.length === 0)
        }
        case ONE_TRANSPLANT: {
            console.log(state)
            return  state.filter(i => i.segments[0].stops.length <= 1)
        }
        case TWO_TRANSPLANT: {
            console.log(state)
            return  state.filter(i => i.segments[0].stops.length <= 2);
        }
        case THREE_TRANSPLANT: {
            console.log(state)
            return  state.filter(i => i.segments[0].stops.length <= 3);
        }
        case REMOVE_ALL: {
            console.log(state)
            return  state
        }
        default:
            return state;
    }
}
