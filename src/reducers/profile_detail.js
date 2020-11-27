import {userConstants} from '../constants'
const initState={}
export const profile_detail =(state = initState, action)=>{
    switch (action.type){
        case userConstants.PROFILE_ID_REQUEST:
            return state
        case userConstants.PROFILE_ID_SUCCESS:
            console.log("reducter",action.profile)
            return {...state,...action.profile}
        default :
            return state
    }
}