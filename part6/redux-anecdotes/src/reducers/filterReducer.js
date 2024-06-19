const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload
        default:
            return state
    }
}

// Action creator to filter the anecdotes:
export const filterChange = (filter) => {
    return {
        type: 'SET_FILTER',
        payload: filter
    }
}

export default filterReducer