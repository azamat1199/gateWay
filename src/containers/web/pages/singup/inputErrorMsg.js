import React from 'react'

export default function InputErrorMsg({type,errorObj}) {
    console.log(type,errorObj);
    if(type !== errorObj.type){
       return null
    }
    return (
        <div>
          <p>{errorObj.message}</p>
        </div>
    )
}