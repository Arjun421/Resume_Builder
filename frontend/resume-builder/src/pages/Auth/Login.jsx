
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail, validateRequired, validatePassword } from '../../utils/helper'
import { UserContext } from "../../context/userContext"
import { authAPI } from '../../utils/axiosInstance'
import toast from 'react-hot-toast'

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate();

  // Handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault()
    
    console.log('🚀 Form submitted!')
    console.log('📧 Email:', email)
    console.log('🔒 Password:', password)
    
    // Clear any previous errors
    setError(null)
    
    // Basic validation
    if (!validateRequired(email) || !validateRequired(password)) {
      console.log('❌ Validation failed: Empty fields')
      setError('Please fill in all fields')
      return
    }
    
    if (!validateEmail(email)) {
      console.log('❌ Validation failed: Invalid email')
      setError('Please enter a valid email address')
      return
    }
    
    if (!validatePassword(password)) {
      console.log('❌ Validation failed: Invalid password')
      setError("Password must be at least 6 characters")
      return 
    }
    
    console.log('✅ Validation passed, making API call...')
    
    try {
      setIsLoading(true)
      console.log('🔄 Setting loading to true')
      
      // Login with API
      console.log('📡 Making API call to authAPI.login...')
      const response = await authAPI.login({
        email,
        password
      })
      
      console.log('✅ API Response:', response)
      
      const { token, ...userData } = response.data
      console.log('🎫 Token:', token)
      console.log('👤 User Data:', userData)
      
      // Store token and update user context
      localStorage.setItem('token', token)
      updateUser(userData)
      
      toast.success('Login successful!')
      navigate('/dashboard')
      
    } catch (error) {
      console.log('❌ API Error:', error)
      const errorMessage = error.message || 'Login failed. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
      console.log('🔄 Setting loading to false')
    }
  }

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs font-semibold text-black mb-4'>
        Please enter your details to log in
      </p>
      <form onSubmit={handleLogin}>
        <Input 
          value={email}
          onChange={({target}) => setEmail(target.value)}
          label="Email Address"
          placeholder="arjun@example.com"
          type="email" 
        />
        <Input 
          value={password}
          onChange={({target}) => setPassword(target.value)}
          label="Password"
          placeholder="Enter your password"
          type="password" 
        />

        {error && <p className='text-red-500 pb-2 text-sm'>{error}</p>}
        
        <button 
          type='submit' 
          className='btn-primary w-full'
          disabled={isLoading}
        >
          {isLoading ? 'LOGGING IN...' : 'LOGIN'}
        </button>
        
        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have an account?{" "}
          <button 
            type="button"
            className='font-medium text-primary underline cursor-pointer'
            onClick={(e) => {
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