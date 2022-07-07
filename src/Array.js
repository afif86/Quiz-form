import React from 'react'

const mixedArray = (array) => {
        const min = 0
        const max = array.length - 1
        let arr = []
      
        while(arr.length<array.length){
          let element = array[Math.floor(Math.random()*(max - min + 1)  + min)]
      
          if (!arr.includes(element)) {
            arr.push(element)
          }
         
        }

    
  return arr
}

export default Array