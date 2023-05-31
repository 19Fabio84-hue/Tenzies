import React from 'react'

export default function Die(props){
    const styles = {
         backgroundColor :props.isHeld ? '#59E391' : ''}
    return(
      <>
          {props.rolling && props.isHeld === false ? <h2 className='rolling-animation die'> </h2>  :
           <h2 className='die' style={styles} onClick={props.toggle}>
            {props.value}
           </h2>}
           </>
    )
}