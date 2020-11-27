import {userConstants} from '../constants'
import {userService} from '../Service'
import {history} from '../helpers'
export const userAction={
    login,
    logout,
    listprofile,
    profiledetail,
};
function login(username,password){
    return dispatch=>{
        dispatch(request({username}));
        userService.login(username,password)
        .then(
            user=>{
                dispatch(success(user));
                history.push("/admin/dashboard") ;
                window.location.reload();
            },
            error => {
                dispatch(failure(error.toString()));
                
            }
        );
    };
    function request(user) {return {type:userConstants.LOGIN_REQUEST,user}}
    function success(user) {return {type:userConstants.LOGIN_SUCCESS,user}}
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function logout() {
    userService.logout();
    history.push("/auth/login")
    return { type: userConstants.LOGOUT };
}
function listprofile(){
    return dispatch=>{
        dispatch(request());
        userService.profile_list()

        .then(list=>{
            dispatch(success(list));
        })

    }
    function request(){return {type:userConstants.PROFILE_REQUEST}}
    function success(list) {return {type:userConstants.PROFILE_SUCCESS,list}}
    
}
function profiledetail(pk){
    return dispatch=>{
        dispatch(request());
        userService.profile_detail(pk)

        .then(profile=>{
            dispatch(success(profile));
            
        })

    }
    function request(){return {type:userConstants.PROFILE_ID_REQUEST}}
    function success(profile) {return {type:userConstants.PROFILE_ID_SUCCESS,profile}}
    
}