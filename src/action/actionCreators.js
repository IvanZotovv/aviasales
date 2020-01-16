
export const filterTransplant = (isChecked) => {
    return {
        type: 'SET_FILTER',
        payload: isChecked,
    }

}

export const filterFastAndChip = (type, state) => {
    switch(type){
        case 'lower':
            return {
                type: 'LOWER_PRICE',
                payload: state
            }
        case 'faster':
            return {
                type: 'FAST_FLIGHT',
                payload: state
            }
        default:
            return state
    }
}