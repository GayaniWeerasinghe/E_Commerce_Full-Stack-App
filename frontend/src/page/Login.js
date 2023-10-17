import React,{useState} from 'react'
import signup from '../assest/signup.webp'
import { Link ,useNavigate} from 'react-router-dom'
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';

const Login = () => {

  const navigate = useNavigate();
  const [data,setData] = useState({
    email: "",
    password: ""
 });

 const userData = useSelector(state=> state)

 const dispatch = useDispatch()

 const handleOnChange = (e) => {
    const {name,value} = e.target
    setData((preve)=> {
        return{
            ...preve,
            [name] : value
        }
    })
 }

 const handleSubmit = async(e) => {

    e.preventDefault()  //page is not refreshed
    const {email,password} = data
    if(email && password){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`,{
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(data)
    })

    const dataRes = await fetchData.json()
    

    if(dataRes.alert){
      dispatch(loginRedux(dataRes))
      setTimeout(()=>{
          toast(dataRes.message);
          navigate('/')
      },1000)
    }    
    }
    else{
        alert("Email is not available, please sign up!")
    }
   
 }

  return (
    <div className='p-3 md:p-4'>
    <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4 mt-24' >

            {/* <h1>Sign Up</h1> */}
            <div className='w-20 rounded-full overflow-hidden drop-shadow-md shadow-md m-auto'>
                <img src={signup} className='w-full'/>
            </div>

            <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' className=' mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded rounded focus-within:outline-blue-400'
                value={data.email} onChange={handleOnChange}></input>
           
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' className=' mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400'
                value={data.password} onChange={handleOnChange}></input>
           
                <button type='submit' className='max-w-[150px] m-auto text-xl text-center font-medium py-1 w-full bg-blue-400 hover:bg-blue-500 mt-4 text-white rounded-full'>Login</button>

            </form>

            <p className='text-sm mt-2'>Don't have an Account? <Link to={'/signup'} className='text-red-500 underline'>Sign Up</Link></p>
    </div>
    </div>
  )
}

export default Login