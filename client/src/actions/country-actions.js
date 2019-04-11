import axios from 'axios';

import { COUNTRIES_LOADING, GET_COUNTRIES, GET_COUNTRY, ADD_COUNTRY, UPDATE_COUNTRY, DELETE_COUNTRY, GET_ERRORS } from './types';

// get all products
const countriesFetched = payload => ({
    type: GET_COUNTRIES,
    payload
})

const countryFetched = payload => ({
    type: GET_COUNTRY,
    payload
})

const countryAdded = payload => ({
    type: ADD_COUNTRY,
    payload
})

const countryUpdated = payload => ({
    type: UPDATE_COUNTRY,
    payload
})

const countryError = payload => ({
    type: GET_ERRORS,
    payload
})

export const countriesLoading = () => {
    return {
        type: COUNTRIES_LOADING
    }
}

export const getCountries = () => dispatch => {
    dispatch(countriesLoading());
    axios
        .get('/country')
        .then(res => dispatch(countriesFetched(res.data)))
        .catch( err => {
            console.log(err)
            dispatch(countriesFetched([]))
        })
}

export const getCountry = (code) => dispatch => {
    dispatch(countriesLoading());
    axios
        .get(`/country/${code}`)
        .then(res => dispatch(countryFetched(res.data)))
        .catch( err => {
            console.log(err)
            dispatch(countryError(err.response.data))
        })
}

export const addCountry = (data,history) => dispatch => {
    dispatch(countriesLoading())
    axios.post('/country', data)
        .then( res => {
            dispatch(countryAdded(res.data))
            history.push('/home/countries')
        })
        .catch( err => {
            console.log(err)
            dispatch(countryError(err.response.data))
        })
}

export const updateCountry = (data,history) => dispatch => {
    dispatch(countriesLoading())
    axios.put('/country', data)
        .then( res => {
            dispatch(countryUpdated(res.data))
            history.push('/home/countries')
        })
        .catch( err => {
            console.log(err)
            dispatch(countryError(err.response.data))
        })
}

// delete country
export const deleteCountry = (code) => dispatch => {
    axios
        .delete(`/country/${code}`)
        .then(res => {
            dispatch({
                type: DELETE_COUNTRY,
                payload: code
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}