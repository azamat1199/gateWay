import {AUTH_SAVE_DATA} from '../actionTypes'

const initialState = {
    lastStep:'',
    form:{
 
    }   
}

const dataSaveReducer = (state = initialState,action) => {
    const {lastStep,form} = action;

    switch(action.type){
        case AUTH_SAVE_DATA:{
            return {...state,lastStep,form}
        }
        default:{
            return state
        }
    }
}



export default dataSaveReducer