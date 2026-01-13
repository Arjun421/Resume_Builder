import React, { useState } from 'react'
import {LuCheck,LuPencil} from "react-icons/lu"
const TitleInput = ({title,setTitle}) => {
  const [showInput,serShowInput]=useState(false)
  return (
  <div className=''>
    {showInput ? (
      <>
        {/* Add your input content here */}
      </>
    ) : (
      <>
        {/* Add your non-input content here */}
      </>
    )}
  </div>
)
}
export default TitleInput;