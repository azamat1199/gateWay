import {AUTH_SIGN_UP,AUTH_SIGN_OUT, AUTH_SAVE_DATA} from '../actionTypes'

export const signUpAction = (payload) =>{
    console.log(payload);
    return{
        payload,
        type:AUTH_SIGN_UP,
    }
}
export const signOutAction = () =>{
    return{
        type:AUTH_SIGN_OUT,
    }
}
export const authSaveData = (lastStep,form) =>{
    return{
        lastStep,
        form,
        type:AUTH_SAVE_DATA,
    }
}