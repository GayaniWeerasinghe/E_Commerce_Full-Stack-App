import React from 'react'

const Success = () => {
  return (
    <div className='bg-green-200 w-full my-48 max-w-md m-auto h-36 flex justify-center items-center font-semibold text-lg'>
    <p className='mx-16'>Payment is Successfully Processed.{" "}<span className='text-red-500 mx-6'>Your Order will be delivered.</span></p>
   </div>
  )
}

export default Success