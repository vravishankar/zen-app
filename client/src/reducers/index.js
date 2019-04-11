import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import errorReducer from './error-reducer';
import productReducer from './product-reducer';
import countryReducer from './country-reducer';
import functionReducer from './function-reducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    product: productReducer,
    country: countryReducer,
    func: functionReducer
});