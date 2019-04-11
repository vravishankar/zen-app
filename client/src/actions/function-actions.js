import axios from 'axios';

import { FUNCTIONS_LOADING, GET_FUNCTIONS, GET_FUNCTION, ADD_FUNCTION, UPDATE_FUNCTION, DELETE_FUNCTION, GET_ERRORS } from './types';

// get all products
const functionsFetched = payload => ({
    type: GET_FUNCTIONS,
    payload
})

const functionFetched = payload => ({
    type: GET_FUNCTION,
    payload
})

const functionAdded = payload => ({
    type: ADD_FUNCTION,
    payload
})

const functionUpdated = payload => ({
    type: UPDATE_FUNCTION,
    payload
})

const functionError = payload => ({
    type: GET_ERRORS,
    payload
})

export const functionsLoading = () => {
    return {
        type: FUNCTIONS_LOADING
    }
}

export const getFunctions = () => dispatch => {
    dispatch(functionsLoading());
    axios
        .get('/function')
        .then(res => dispatch(functionsFetched(res.data)))
        .catch( error => {
            console.log(error)
            dispatch(functionsFetched([]))
        })
}

export const getFunction = (id) => dispatch => {
    dispatch(functionsLoading());
    axios
        .get(`/function/${id}`)
        .then(res => dispatch(functionFetched(res.data)))
        .catch( err => {
            console.log(err)
            dispatch(functionError(err.response.data))
        })
}

// add function
export const addFunction = (data,history) => dispatch => {
    dispatch(functionsLoading())
    axios.post('/function', data)
        .then( res => {
            dispatch(functionAdded(res.data))
            history.push('/home/functions')
        })
        .catch( err => {
            console.log(err)
            dispatch(functionError(err.response.data))
        })
}

// update function
export const updateFunction = (data,history) => dispatch => {
    dispatch(functionsLoading())
    axios.put('/function', data)
        .then( res => {
            dispatch(functionUpdated(res.data))
            history.push('/home/functions')
        })
        .catch( err => {
            console.log(err)
            dispatch(functionError(err.response.data))
        })
}

// delete function
export const deleteFunction = (id) => dispatch => {
    axios
        .delete(`/function/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_FUNCTION,
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