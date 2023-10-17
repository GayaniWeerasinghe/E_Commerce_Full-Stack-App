import React from 'react'
import {useSelector} from 'react-redux'
import CartProduct from '../component/CartProduct';
import empty from '../assest/empty.gif'
import {loadStripe} from '@stripe/stripe-js'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const productCartItem = useSelector((state)=> state.product.cartItem)

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async() => {

    if(user.email){
          
      const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
       const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`,{
          method : "POST",
          headers : {
            "content-type" : "application/json"
          },
          body: JSON.stringify(productCartItem)
       })

       if(res.statusCode === 500) return;

          const data = await res.json()
          console.log(data)

          toast("Redirect to payment Gateway...!")
          stripePromise.redirectToCheckout({sessionId : data}) 
      }else{
        toast("You have not Login!")
        setTimeout(()=>{
          navigate("/login")
        },1000)
      
       }
      }

  return (
      <>
      <div className='p-2 mb:p-4'>
       <h2 className='text-lg md:text-2xl font-bold text-slate-600'>Your Cart Items</h2>
       {  productCartItem[0] ?
       <div className='my-4 flex gap-4'>
           {/* Display cart items */}
           <div className='w-full max-w-3xl'>
              {
                productCartItem.map(el=>{
                  return(
                    <CartProduct
                        key={el._id}
                        id={el._id}
                        name={el.name}
                        image={el.image}
                        category={el.category}
                        price={el.price}
                        qty={el.qty}
                        total={el.total}
                    />
                  )
                })
              }
           </div>

           {/* Total cart items */}
           <div className='w-full max-w-lg bg-slate-100 ml-auto mx-2'>
                <h2 className='bg-blue-500 text-white p-2 text-lg'>Summary</h2>
                <div className='flex w-full py-2 text-lg border-b'>
                   <p>Total Qty :</p>
                   <p className='m-auto w-32 font-bold'>{totalQty}</p>
                </div>
                <div className='flex w-full py-2 text-lg border-b'>
                   <p>Total Price :</p>
                   <p className='m-auto w-32 font-bold'><span className='text-red-500'>LKR </span>{totalPrice}.00</p>
                </div>
                <button className='bg-green-600 py-2 text-lg w-full text-white font-bold' onClick={handlePayment}>Checkout</button>
           </div>
       </div>
         :  
         <>
         <div className="flex w-full justify-center items-center flex-col my-24">
           <img src={empty} className=" w-full max-w-sm"/>
           <p className="text-slate-500 text-3xl font-bold my-4"><span className=' text-red-500'>Cart is Empty!!</span></p>
         </div>
         </>
}
       
    </div>
    </>

  )
}


export default Cart