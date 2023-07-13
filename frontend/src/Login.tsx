import React, { useContext, useLayoutEffect, useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/ContextProvider';

function Login() {

  const navigate = useNavigate();
  const { isLoggedin , Login} = useContext(AuthContext)
  const [form,setForm] = useState({
    email:"",
    password:""
  })

  useLayoutEffect(()=>{
    if(isLoggedin){
      navigate('/home')
      return;
    }
  },[isLoggedin])


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name , value} = e.target;
    setForm({...form,[name]:value})
  }

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     const data:string = await Login(form.email,form.password)
     if(data){
      alert(data);
     }
  }

  return (
    <div className='login'>
      <div>
      <form onSubmit={(e)=>handleSubmit(e)} action="">
        <label htmlFor="">Enter Username</label>
        <input required onChange={(e)=>handleChange(e)} name='email' type="text" placeholder='username' />
        <label htmlFor="">Enter Password</label>
        <input required onChange={(e)=>handleChange(e)} name='password' placeholder='password' type="password" />
        <button >submit</button>
      </form>
      </div>
    </div>
  )
}

export default Login
