import React from 'react'

const NoContactFound = () => {
  return (
    <div className='flex gap-3 justify-center items-center h-[70vh]'>
        <img src="/contact.png" alt="" />
        <h3 className='text-white font-semibold text-2xl'>Contact Not Found</h3>
    </div>
  )
}

export default NoContactFound