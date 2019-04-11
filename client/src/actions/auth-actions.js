import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/set-auth-token';
import jwt_decode from 'jwt-decode';

// Login
export const loginUser = (userData, history) => dispatch => {
    axios.post('/auth/login',userData)
    .then(res => {
        const { token } = res.data
        localStorage.setItem('jwtToken',token)
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        }
    );
};

// Register
export const registerUser = (userData, history) => dispatch => {
    axios.post('/auth/register', userData)
    .then( res => history.push('/login'))
    .catch ( err => {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
    );
}

// Set Current User
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Logout User
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}