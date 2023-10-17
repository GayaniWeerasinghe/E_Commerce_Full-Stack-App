import React, { useState } from 'react'
import signup from '../assest/signup.webp'
import { Link, useNavigate } from 'react-router-dom'
import {ImagetoBase64} from '../utility/ImagetoBase64'
import { toast } from "react-hot-toast";

const Signup = () => {

 const navigate = useNavigate()
 const [data,setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: ""
 });

 console.log(data);
 const handleOnChange = (e) => {
    const {name,value} = e.target
    setData((preve)=> {
        return{
            ...preve,
            [name] : value
        }
    })
 }

 const handleUploadProfile = async (e) => {
     
     const data = await ImagetoBase64(e.target.files[0])
     console.log(data);

     setData((preve)=> {
        return{
            ...preve,
            image : data
        }
    })
 }

 const handleSubmit = async(e) => {

    e.preventDefault()  //page is not refreshed
    const {firstName,email,password,confirmPassword} = data
    if(firstName && email && password && confirmPassword){
         if(password === confirmPassword){
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataRes = await fetchData.json()
            console.log(dataRes);

            toast(dataRes.message)
            if(dataRes.alert){
                navigate("/login");
              }

         }
         else{
            alert("Password and Confirm Password are not matched!")
         }
    }
    else{
        alert("Please enter required fields!")
    }
   
 }

  return (
    <div className='p-3 md:p-4'>
    <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>

            {/* <h1>Sign Up</h1> */}
            <div className='w-20 h-20 rounded-full overflow-hidden drop-shadow-md shadow-md m-auto relative'>
                <img src={data.image ? data.image :signup} className='w-full h-full'/>
                <label htmlFor='profileImage'>
                <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
                    <p className='text-sm p-1 text-white'>Upload</p>
                </div>
                <input type='file' id='profileImage' accept='/image*' className='hidden' onChange={handleUploadProfile}/>
                </label>
            </div>

            <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor='firstName'>First Name</label>
                <input type='text' id='firstName' name='firstName' className=' mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400'
                value={data.firstName} onChange={handleOnChange}></input>

                <label htmlFor='lastName'>Last Name</label>
                <input type='text' id='lastName' name='lastName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400'
                value={data.lastName} onChange={handleOnChange}></input>
           
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' className=' mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded rounded focus-within:outline-blue-400'
                value={data.email} onChange={handleOnChange}></input>
           
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' className=' mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400'
                value={data.password} onChange={handleOnChange}></input>

                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input type='password' id='confirmPassword' name='confirmPassword' className=' mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400'
                value={data.confirmPassword} onChange={handleOnChange}></input>
           
                <button type='submit' className='max-w-[150px] m-auto text-xl text-center font-medium py-1 w-full bg-blue-400 hover:bg-blue-500 mt-4 text-white rounded-full'>Sign Up</button>

            </form>

            <p className='text-sm mt-2'>Already have an Account? <Link to={'/login'} className='text-red-500 underline'>Login</Link></p>
    </div>
    </div>
  )
}

export default Signup