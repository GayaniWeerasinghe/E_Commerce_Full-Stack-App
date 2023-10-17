import React, { useState } from 'react'
import logo from '../assest/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineUserCircle } from "react-icons/hi";
import {FaShoppingCart} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from '../redux/userSlice';
import { toast } from "react-hot-toast";

const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showMenu , setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu(preve => !preve)
  }

  const userData = useSelector((state) => state.user)

  const handleLogout = () => {
     dispatch(logoutRedux())
     setTimeout(()=>{
      toast("Logout successfully");
      navigate('/login')
  },1000)
  }

  const cartItemNumber = useSelector((state)=> state.product.cartItem)

  return (
    <header className='fixed shadow-md w-full h-16 px-2 md:px-4 bg-white'>
        {/* desktop */}
         <div className='flex items-center h-full justify-between'>
           <Link to=''>
           <div className='h-12 flex'>
               <img src={logo} className='h-full text-4xl'/>
               <h2 className='font-bold text-3xl mt-1'><span className='text-red-600'>MILanka</span></h2>
           </div>
           </Link>
           <div className='flex items-center gap-4 mb:gap-7'>
                 <nav className='flex gap-4 mb:gap-6 text-base md:text-lg z-50 hidden md:flex'>
                   <Link to=''>Home</Link>
                   <Link to='menu/6526b380df08e3dfc9db83ff'>Menu</Link>
                   <Link to='about'>About</Link>
                   <Link to='contact'>Contact</Link>
                 </nav>
                 <div className='text-2xl text-slate-600 relative'>
                    <Link to={'/cart'}><FaShoppingCart/></Link>
                    <div className='absolute -top-1 -right-1 text-white bg-red-500 rounded-full h-4 w-4 p-0 m-0 text-sm text-center'>{cartItemNumber.length}</div>
                 </div>
                 <div className='text-xl text-slate-600' onClick={handleShowMenu}>
                 <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
                   {userData.image ? ( <img src={userData.image} className="h-full w-full" />) : (
                     <HiOutlineUserCircle />
                   )}
                 </div>
                    {
                      showMenu && (<div className='absolute right-2 bg-white px-2 py-2 shadow drop-shadow-md flex flex-col'>
                      {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (<Link to={'newproduct'} className='whitespace-nowrap cursor-pointer text-sm'>New Product</Link>)}
                      {
                        userData.image ? <p className='whitespace-nowrap cursor-pointer bg-red-500 px-2 text-white text-sm' onClick={handleLogout}>Logout ({userData.firstName})</p> : <Link to={'login'} className='whitespace-nowrap cursor-pointer text-sm'>Login</Link>
                      }
                      <nav className="text-base md:text-lg flex flex-col md:hidden">
                         <Link to={""} className="px-2 py-1">Home</Link>
                         <Link to={"menu/6526b380df08e3dfc9db83ff"} className="px-2 py-1">Menu</Link>
                         <Link to={"about"} className="px-2 py-1">About</Link>
                         <Link to={"contact"} className="px-2 py-1">Contact</Link>
                      </nav>
                   </div>
                    )}
                    
                 </div>
           </div>
         </div>

        {/* mobile */}
    </header>
  )
}

export default Header