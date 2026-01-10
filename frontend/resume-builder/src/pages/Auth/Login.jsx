
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail, validateRequired,validatePassword } from '../../utils/helper'

const Login = ({ setCurrentPage }) => {
  const [email,setEmail]= useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState(null)
  const navigate = useNavigate();
  //handle login from submit
  const handleLogin = async (e) => {
    e.preventDefault()
    
    // Clear any previous errors
    setError(null)
    
    // Basic validation
    if (!validateRequired(email) || !validateRequired(password)) {
      setError('Please fill in all fields')
      return
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    if (!validatePassword(password)){
      setError("Password must be 6 Characters")
      return 
    }
    
    try {
      
      console.log('Login attempt:', { email, password })
      
     
      
      alert('Login successful!')
      
    } catch (error) {
      setError('Login failed. Please try again.')
      console.error('Login error:', error)
    }
  }



  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs font-semibold text-black mb-4'>
        Please enter your details to log in
      </p>
      <form onSubmit = {handleLogin}>
       <Input 
          value = {email}
          onChange={({target})=>setEmail(target.value)}
          label = "Email Address"
          placeholder = "arjun@example.com"
          type="text" 
        />
        <Input 
          value = {password}
          onChange={({target})=>setPassword(target.value)}
          label = "Password"
          placeholder = "Enter your password"
          type="password" 
        />


        {error && <p className='text-red-500 pb-.5 text-sm'>{error}</p>}
        <button type='submit' className='btn-primary'>
          LOGIN
        </button>
        <p className='text-[13px] text-slate-800 mt-3'>
          Dont't have  an account?{" "}
          <button 
          type="button"
          className='font-medium text-primary underline cursor-pointer'
          onClick={(e)=>{
            e.preventDefault()
            setCurrentPage('signup')
          }}
          > 
            Signup
          </button>
        </p>
      </form>

    </div>
  )
}

export default Login