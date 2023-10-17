import React from 'react'
import { Link } from 'react-router-dom'
import { addCartItem } from '../redux/productSlice'
import { useDispatch } from 'react-redux'

const CardFeature = ({image,name,price,category,loading,id}) => {

  const dispatch = useDispatch()
  const handleAddCart = (e) => {
    dispatch(addCartItem({
      _id : id,
      name : name,
      price : price,
      category : category,
      image : image
    }))
  }

  return (
    <div className='w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg py-5 px-4 drop-shadow-lg cursor-pointer'>
      {
        image ? 
        <>
          <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior:"smooth"})}>
          <div className='h-28 flex flex-col justify-center items-center'>
            <img src={image} className='h-full'></img>
          </div>
              <h3 className='font-semibold text-slate-600 capitalize text-lg mt-3 overflow-hidden whitespace-nowrap'>{name}</h3>
              <p className='text-slate-500 font-medium'>{category}</p>
              <p className='text-slate-700 font-bold'><span className='text-red-500'>LKR </span><span>{price}</span>.00</p>
              </Link>
              <button className='bg-yellow-500 hover:bg-yellow-600 py-1 my-1 mt-1 w-full rounded font-medium' onClick={handleAddCart}>Add to Cart</button>
              
        </> : (
          <div className='min-h-[150px] flex justify-center items-center'>
            <p>{loading}</p>
          </div>
        )
      } 
       
    </div>
  )
}

export default CardFeature