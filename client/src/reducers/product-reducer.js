import {  GET_PRODUCTS,PRODUCTS_LOADING, GET_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../actions/types';

const initialState = {
    product: {},
    products: [],
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case PRODUCTS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PRODUCTS:
            return {
                ...state, 
                products: action.payload,
                loading: false
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(item => item.id !== action.payload)
            }
        default:
            return state
    }
}