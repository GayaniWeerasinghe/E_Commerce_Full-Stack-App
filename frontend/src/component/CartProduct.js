import React from 'react'
import {FaPlus,FaMinus} from 'react-icons/fa'
import {TiDelete} from 'react-icons/ti'
import { useDispatch } from 'react-redux'
import { deleteCartItem,increaseQty,decreaseQty} from '../redux/productSlice'

const CartProduct = ({id,name,image,category,price,qty,total}) => {

  const dispatch = useDispatch()

  return (
    <div className='bg-slate-200 p-2 flex gap-2 rounded border border-slate-300'>
        <div className='bg-white rounded overflow-hidden'>
            <img src={image} className='h-36 w-36 object-cover p-3'/>
        </div>
        <div className='flex flex-col gap-1 p-4 mx-8 w-full'>
               <div className='justify-between flex'>
               <h3 className='font-semibold text-slate-600 capitalize text-lg md:text-xl'>{name}</h3>
                 <div className='text-3xl text-slate-700 hover:text-red-500 cursor-pointer' onClick={()=>dispatch(deleteCartItem(id))}><TiDelete/></div>
                 </div>
                <p className='text-slate-500 font-medium'>{category}</p>
                <p className='text-slate-700 font-bold text-base'><span className='text-red-500'>LKR </span><span>{price}</span>.00</p>
                <div className='flex justify-between'>
                <div className='flex gap-4 items-center'>
                     <button onClick={()=>dispatch(increaseQty(id))} className='p-1 items-center bg-red-500 hover:bg-red-600 py-1 my-1 mt-1 w-full rounded font-medium'><FaPlus/></button>
                     <p className='font-semibold p-1'>{qty}</p>
                     <button onClick={()=>dispatch(decreaseQty(id))} className='p-1 items-center bg-red-500 hover:bg-red-600 py-1 my-1 mt-1 w-full rounded font-medium'><FaMinus/></button>
                </div>
                <div className='flex items-center gap-2 font-bold text-slate-700'>
                     <p>Total :</p>
                     <p><span className="text-red-500 font-bold">LKR </span>{total}.00</p>
                </div>
                </div>
          </div>
    </div>
  )
}

export default CartProduct