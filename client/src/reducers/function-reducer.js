import { FUNCTIONS_LOADING, GET_FUNCTIONS, GET_FUNCTION, ADD_FUNCTION, UPDATE_FUNCTION, DELETE_FUNCTION } from '../actions/types';

const initialState = {
    func: {},
    funcs: [],
    loading: false
}

export default function(state= initialState, action) {
    switch(action.type) {
        case FUNCTIONS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_FUNCTIONS:
            return {
                ...state,
                loading: false,
                funcs: action.payload
            }
        case GET_FUNCTION:
            return {
                ...state,
                loading: false,
                func: action.payload
            }
        case ADD_FUNCTION:
            return {
                ...state,
                funcs: [action.payload, ...state.funcs]
            }
        case UPDATE_FUNCTION:
            return {
                ...state,
                func: action.payload
            }
        case DELETE_FUNCTION:
            return {
                ...state,
                funcs: state.funcs.filter(item => item.id !== action.payload)
            }
        default:
            return state;
    }
}