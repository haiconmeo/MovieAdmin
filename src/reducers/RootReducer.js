import {combineReducers} from 'redux';
import {authentication} from './auth';
import {profile} from './profile';
import {profile_detail} from './profile_detail'
export const rootReducers = combineReducers({
    authentication,
    profile,
    profile_detail,
});
export default rootReducers;