import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../component/HomeCard'
import { useSelector } from 'react-redux';
import CardFeature from '../component/CardFeature'
import {GrPrevious,GrNext} from 'react-icons/gr'
import AllProduct from '../component/AllProduct';
import { Link } from 'react-router-dom';

const Home = () => {

  const productData = useSelector((state) => state.product.productList);

  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetables",
    []
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);
  const HomeProductList = productData.slice(0,6)

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200
  }

  const previousProduct = () => {
    slideProductRef.current.scrollLeft -= 200
  }

  return (
    <div className='p-2 mb:p-4'>
       <div className='md:flex gap-4 py-2'>

          <div className='md:w-1/2'>
            <div className='flex gap-3 w-36 bg-red-100 px-2 items-center rounded-full'>
               <p className='text-sm'>Van Delivery</p>
               <img src='https://cdn-icons-png.flaticon.com/512/2290/2290690.png' className='h-7'></img>
            </div>
            <h2 className='text-3xl md:text-7xl font-bold py-3'>The Best Buying and Selling{" "}
            <span className="text-red-600 text-">Over the Internet</span>
            </h2>
            <p className='py-3 text-base'>Market in Lanka refers to the process of buying and selling products & services over the Internet. Online shopping is becoming increasingly popular because of speed and ease of use for customers.
             E-commerce activities such as selling online can be directed at consumers or other businesses.</p>
             <Link to='menu/6526b380df08e3dfc9db83ff'><button className='font-bold bg-red-500 rounded-md text-slate-200 px-4 py-2 item-center'>Order Now</button></Link>
          </div>

          <div className='md:w-1/2 flex flex-wrap gap-3 p-4 justify-center'>
            {
              HomeProductList[0] ? HomeProductList.map(el => {
                return(
                  <HomeCard
                     key={el._id}
                     id={el._id}
                     image = {el.image}
                     name = {el.name}
                     price = {el.price}
                     category = {el.category}
                  />
                )
              })
              : loadingArray.map((el, index) => {
                return <HomeCard key={index+"loading"} loading={"Loading..."} />;
              })}
              
          </div>
       </div>
       <div className=''>
             <div className='flex w-full items-center'>
             <h2 className='font bold text-2xl text-slate-800 mb-4'>Fresh Vegetables</h2>
             <div className='ml-auto flex gap-4'>
                 <button onClick={previousProduct} className='bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded'><GrPrevious/></button>
                 <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded'><GrNext/></button>
             </div>
             </div>
             <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
              {
                homeProductCartListVegetables[0]
                ? homeProductCartListVegetables.map(el => {
                  return(
                    <CardFeature
                    key={el._id+"vegetable"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                    />
                  )
                })
               : loadingArrayFeature.map((el,index) => (
                <CardFeature loading="Loading..." key={index+"cartLoading"} />
              ))}
             </div>
       </div>
         <AllProduct heading={"Your Product"}/>
    </div>
  )
}

export default Home