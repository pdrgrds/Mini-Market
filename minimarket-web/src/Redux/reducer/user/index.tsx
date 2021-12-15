import { combineReducers } from 'redux';
import options from './options';
import session from './session';

const RForm = combineReducers({
    options,
    session
})

export default RForm;