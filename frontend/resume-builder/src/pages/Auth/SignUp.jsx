
import React, {useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import { validateEmail, validateRequired,validatePassword } from '../../utils/helper'

const SignUp = ({ setCurrentPage }) => {
  const [profilePic,setProfilePic]=useState(null);
  const [fullname,setFullName]=useState("");
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(null)
  const navigate = useNavigate()
  const handleSignUp = async (e)=>{
    e.preventDefault()
    let profileImageUrl=""
    if (!fullname){
      setError("Please enter full name.")
      return 
    }
    if(!validateRequired(email)){
      setError("Please enter a valid email.")
      return 
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address.")
      return
    }
    if(!validatePassword(password)){
      setError('Password must be at least 6 characters')
      return 
    }
    setError("");
    try{

    }catch(err){

    }

  }
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>

      <h3 className='text-lg font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Joinn us today by entering your details below.
        </p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
            <Input
            value={fullname} 
            onChange={({target})=>setFullName(target.value)}
            label="Full Name"
            placeholder="Arjun"
            type="text"

            />
            <Input
            value={email} 
            onChange={({target})=>setEmail(target.value)}
            label="Email address"
            placeholder="arjun@gexample.com"
            type="text"

            />
            <Input
            value={password} 
            onChange={({target})=>setPassword(target.value)}
            label="Password"
            placeholder="Min 6 Characters"
            type="password"
            
            />
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type ="submit" className='btn-primary'>
            SIGNUP
          </button>
          <p className='text-[13px] text-slate-800 mt-3'>
            Already an account?{" "}
            <button type="button"
              className='font-medium text-primary underline cursor-pointer'
              onClick={()=>{
                setCurrentPage("login")
              }}
            >
              LOGIN
            </button>
          </p>
        </form>
      
    </div>
  )
}

export default SignUp