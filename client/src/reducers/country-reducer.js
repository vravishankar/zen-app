import { COUNTRIES_LOADING, GET_COUNTRIES, GET_COUNTRY, ADD_COUNTRY, UPDATE_COUNTRY, DELETE_COUNTRY } from '../actions/types';

const initialState = {
    country: {},
    countries: [],
    loading: false
}

export default function(state= initialState, action) {
    switch(action.type) {
        case COUNTRIES_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_COUNTRIES:
            return {
                ...state,
                loading: false,
                countries: action.payload
            }
        case GET_COUNTRY:
            return {
                ...state,
                loading: false,
                country: action.payload
            }
        case ADD_COUNTRY:
            return {
                ...state,
                countries: [action.payload, ...state.countries]
            }
        case UPDATE_COUNTRY:
            return {
                ...state,
                country: action.payload
            }
        case DELETE_COUNTRY:
            return {
                ...state,
                countries: state.countries.filter(item => item.code !== action.payload)
            }
        default:
            return state;
    }
}