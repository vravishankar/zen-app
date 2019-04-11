import axios from 'axios';

// import API_CONFIG from '../config/api';
import { GET_PRODUCTS, PRODUCTS_LOADING, GET_ERRORS, GET_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from './types';

// Side effects Functions
const productsFetched = payload => ({
    type: GET_PRODUCTS,
    payload
})

const productFetched = payload => ({
    type: GET_PRODUCT,
    payload
})

const productUpdated = payload => ({
    type: UPDATE_PRODUCT,
    payload
})

// get all products
export const getProducts = () => dispatch => {
    dispatch(setProductsLoading())
    axios
        .get('/product')
        .then(res => dispatch(productsFetched(res.data)))
        .catch( error => {
            console.log(error)
            dispatch(productsFetched([]))
        })
}

// get one product
export const getProduct = (id) => dispatch => {
    dispatch(setProductsLoading())
    axios
        .get(`/product/${id}`)
        .then( res => {dispatch(productFetched(res.data))})
        .catch( error => {
            console.log(error)
            dispatch(productFetched({}))
        })
}

// add new product
export const addProduct = (productData,history) => dispatch => {
    axios
        .post('/product',productData)
        .then (res => history.push('/home/products'))
        .catch (err => {
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        })
}

// update product
export const updateProduct = (productData,history) => dispatch => {
    axios
        .put(`/product/${productData.id}`,productData)
        .then(res => { 
            dispatch(productUpdated(res.data))
            history.push('/home/products')
        })
        .catch (err => {
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        })
}

// delete product
export const deleteProduct = (id) => dispatch => {
    axios
        .delete(`/product/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_PRODUCT,
                payload: id
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// products loading
export const setProductsLoading = () => {
    return {
        type: PRODUCTS_LOADING
    }
}