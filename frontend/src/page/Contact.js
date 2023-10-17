import React from 'react'
import phone from '../assest/phone.png'
import email from '../assest/email.png'
import {IoIosContacts} from 'react-icons/io'

const Contact = () => {
  return (
    <div className='p-2 mb:p-4'>
       <IoIosContacts className='text-3xl mt-2 text-orange-700 w-12 h-12 rounded-full overflow-hidden drop-shadow-md shadow-md m-auto relative'/>
       <h2 className='text-xl my-3 text-center md:text-4xl font-bold text-slate-600'>Contact Us</h2>
       <p className='text-center my-2 text-slate-500'>Question not answered yet? We are here to help!</p>
      
       <div className='bg-slate-200 my-18 p-2 mt-12 flex gap-2 rounded border border-slate-300 w-full max-w-2xl m-auto'>
        <div className='m-auto'>
            <img src={phone} className='h-28 w-56 object-cover p-3 rounded-full overflow-hidden drop-shadow-md'/>
        </div>
        <div className='flex flex-col gap-1 p-4 mx-8 w-full'>
               <div className='gap-6 justify-between'>
               <h3 className='font-semibold text-slate-600 capitalize text-lg md:text-xl'>By Phone</h3>
               <p className='text-slate-500 font-medium'>+94715642513</p>
               <p className='text-slate-500 font-medium'>+94775642514</p>
          </div>
    </div>
    <div className='flex text-white'>
        <button className='bg-orange-700 hover:bg-yellow-500 py-1 my-1 mt-8 mx-4 w-32 h-12 border-white border-b rounded font-medium'>Call Now</button>
    </div>
    </div>

    <div className='bg-slate-200 p-2 flex gap-2 rounded border border-slate-300 w-full max-w-2xl m-auto'>
        <div className='m-auto'>
            <img src={email} className='h-24 w-56 object-cover p-3 rounded-full overflow-hidden drop-shadow-md'/>
        </div>
        <div className='flex flex-col gap-1 p-4 mx-8 w-full'>
               <div className='gap-6 justify-between'>
               <h3 className='font-semibold text-slate-600 capitalize text-lg md:text-xl'>By Email</h3>
               <p className='text-slate-500 font-medium'>milanka@gmail.com</p>
               <p className='text-slate-500 text-sm font-base'>Typical reply time within a day or two</p>
          </div>
    </div>
    <div className='flex text-white'>
        <button className='bg-orange-700 hover:bg-yellow-500 py-1 my-1 mt-8 mx-4 w-32 h-12 border-white border-b rounded font-medium'>Send Email</button>
    </div>
    </div>

      </div>

  )
}

export default Contact