import {userConstants} from '../constants'
const initState=[]
export const profile =(state = initState, action)=>{
    switch (action.type){
        case userConstants.PROFILE_REQUEST:
            return state
        case userConstants.PROFILE_SUCCESS:

            return [...state]
        default :
            return state
    }
}