import {AUTH_SIGN_UP,AUTH_SIGN_OUT, AUTH_SAVE_DATA}from '../actionTypes'

const initialState = {
   access:'',
   refresh:'',
   data:{

   },
   role:'',
}

const userReducer = (state=initialState,action)=>{
    console.log(action);
    // const {lastStep,form} = action
    const {payload} = {...action};
    console.log(payload);
    switch (action.type){
        case AUTH_SIGN_UP:{
            return{payload}
        }
        // case AUTH_SAVE_DATA:{
        //     return {...state,lastStep,form}
        // }
        case AUTH_SIGN_OUT:{
            return initialState
        }
        default:{
            return state;
        }
    }
}
export default userReducer