import {userConstants} from '../constants'
let user =JSON.parse(localStorage.getItem('user'));

const initState = user ? {loggedIn:true,user,fail_login:false}:{};

export const authentication = (state = initState, action) =>{
    switch(action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggedIn:true,
                user:action.user,
                fail_login:false
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn:true,
                user:action.user,
                fail_login:false
            };
        case userConstants.LOGIN_FAILURE:
            return {fail_login:true};
        case userConstants.LOGOUT:
            return{};
        default:
            return state
    }
}