import React from 'react'

const CustomButton = ({handleButton, title}) => {
  return (
    <button className='w-20 h-10 rounded-md bg-white text-black hover:text-gray-400' onClick={handleButton}>{title}</button>
  )
}

export default CustomButton