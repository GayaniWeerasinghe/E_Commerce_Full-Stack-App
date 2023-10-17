import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AllProduct from '../component/AllProduct'
import { addCartItem } from '../redux/productSlice'

const Menu = () => {

  const navigate = useNavigate()
  const {filterby} = useParams()
  const productData = useSelector(state=> state.product.productList)

  const productDisplay = productData.filter((el) => el._id === filterby)[0]

  const dispatch = useDispatch()

  const handleAddCart = (e) => {
    dispatch(addCartItem(productDisplay))
  }

  const handleBuy = () => {
    dispatch(addCartItem(productDisplay))
    navigate('/cart')
  }

  return (
    <div className='p-2 md:p-4'>
       <div className='w-full max-w-2xl bg-white m-auto md:flex'>
          <div className='overflow-hidden max-w-sm'>
              <img src={productDisplay.image} className='hover:scale-105 transition-all'/>
          </div>
          <div className='flex flex-col gap-1 p-4 mx-8'>
               <h3 className='font-semibold text-slate-600 capitalize md:text-4xl'>{productDisplay.name}</h3>
                <p className='text-slate-500 font-medium text-xl'>{productDisplay.category}</p>
                <p className='text-slate-700 font-bold md:text-2xl'><span className='text-red-500'>LKR </span><span>{productDisplay.price}</span>.00</p>
                <div className='flex gap-4'>
                     <button className='min-w-[100px] bg-yellow-500 hover:bg-yellow-600 py-1 my-1 mt-1 w-full rounded font-medium' onClick={handleBuy}>Buy</button>
                     <button className='min-w-[100px] bg-yellow-500 hover:bg-yellow-600 py-1 my-1 mt-1 w-full rounded font-medium' onClick={handleAddCart}>Add to Cart</button>
                </div>
                <div className=''>
                    <p className='text-slate-500 font-medium'>Description : </p>
                    <p>{productDisplay.description}</p>
                </div>
          </div>
       </div>

        <AllProduct heading={"Related Products"}/>
    </div>
  )
}

export default Menu