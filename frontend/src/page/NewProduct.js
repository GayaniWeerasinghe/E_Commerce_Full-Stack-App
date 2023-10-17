import React, { useState } from 'react'
import {BiUpload} from 'react-icons/bi'
import {ImagetoBase64} from '../utility/ImagetoBase64'
import { toast } from "react-hot-toast";

const NewProduct = () => {

  const [data,setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: ""
 });

 const handleOnChange = (e) => {
  const {name,value} = e.target
  setData((preve)=> {
      return{
          ...preve,
          [name] : value
      }
  })
}

  const handleImage = async(e) => {
    const data = await ImagetoBase64(e.target.files[0])
    
    setData((preve)=> {
      return{
          ...preve,
          image : data
      }
  })

  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const {name,image,category,price} = data

    if(name && image && category && price){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/addProduct`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const fetchRes =  await fetchData.json()
      toast(fetchRes.message)

      setData(()=>{
        return{
          name : "",
          category : "",
          image : "",
          price : "",
          description : ""
        }
      })
    }
    else{
      toast("Enter required Fields!")
    }
    
   
  }

  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <h1 className='text-blue-500 text-lg font-bold text-center'>Add New Product</h1>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' value={data.name} className='my-1 bg-slate-200 p-1 focus-within:outline-blue-400' onChange={handleOnChange}></input>

        <label htmlFor='category'>Category</label>
        <select value={data.category} className='my-1 bg-slate-200 p-1 focus-within:outline-blue-400' id='category' name='category' onChange={handleOnChange}>
          <option value={"others"}>--Select Category--</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetables"}>Vegetables</option>
          <option value={"chips"}>Chips</option>
          <option value={"chocolates"}>Chocolates</option>
          <option value={"shoes"}>Shoes</option>
          <option value={"frocks"}>Frocks</option>
          <option value={"cakes"}>Cakes</option>
          <option value={"watches"}>Watches</option>
          <option value={"burger"}>Burger</option>
        </select>

        <label htmlFor='image'>Image
        <div className='h-40 w-full bg-slate-200 my-1 cursor-pointer rounded flex items-center justify-center focus-within:outline-blue-400'>
          {
             data.image ? <img src={data.image} className='h-full'></img> : <span className='text-5xl'><BiUpload/></span>
          }
          <input type='file' id='image' accept='/image*' className='hidden' onChange={handleImage}/>
        </div>
        </label>

        <label htmlFor='price'>Price</label>
        <input type='text' name='price' value={data.price} className='my-1 bg-slate-200 p-1 focus-within:outline-blue-400' onChange={handleOnChange}></input>

        <label htmlFor='description'>Description</label>
        <textarea rows={2} value={data.description} className='my-1 bg-slate-200 p-1 focus-within:outline-blue-400 resize-none' name='description' onChange={handleOnChange}></textarea>
        
        <button className='bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>

      </form>
    </div>
  )
}

export default NewProduct