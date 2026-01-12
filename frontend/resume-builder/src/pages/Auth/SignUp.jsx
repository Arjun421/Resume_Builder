
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import { validateEmail, validateRequired, validatePassword } from '../../utils/helper'
import { UserContext } from "../../context/userContext"
import { authAPI } from '../../utils/axiosInstance'
import uploadImage from '../../utils/uploadImage'
import toast from 'react-hot-toast'

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    
    // Clear previous errors
    setError(null)
    
    // Validation
    if (!validateRequired(fullname)) {
      setError("Please enter full name.")
      return 
    }
    if (!validateRequired(email)) {
      setError("Please enter email address.")
      return 
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters')
      return 
    }

    try {
      setIsLoading(true)
      
      let profileImageUrl = null;
      
      // Upload profile image if present
      if (profilePic) {
        try {
          console.log('📸 Uploading profile image...');
          const uploadResponse = await uploadImage(profilePic);
          profileImageUrl = uploadResponse.imageUrl || uploadResponse.url;
          console.log('✅ Image uploaded successfully:', profileImageUrl);
        } catch (uploadError) {
          console.error('❌ Image upload failed:', uploadError);
          // Continue with signup even if image upload fails
          toast.error('Image upload failed, but account will be created without profile picture');
        }
      }
      
      // Prepare signup data
      const signupData = {
        name: fullname,
        email,
        password,
        profileImageUrl
      }

      console.log('🚀 Signup attempt:', { ...signupData, profileImageUrl: profileImageUrl ? 'Image uploaded' : 'No image' })
      
      // Register with API
      const response = await authAPI.register(signupData)
      
      const { token, ...userData } = response.data
      
      // Store token and update user context
      localStorage.setItem('token', token)
      updateUser(userData)
      
      toast.success('Account created successfully!')
      navigate('/dashboard')
      
    } catch (error) {
      const errorMessage = error.message || 'Registration failed. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Signup error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Create an Account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Join us today by entering your details below.
      </p>
      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className='grid grid-cols-1 gap-2'>
          <Input
            value={fullname} 
            onChange={({target}) => setFullName(target.value)}
            label="Full Name"
            placeholder="Arjun Singh"
            type="text"
          />
          <Input
            value={email} 
            onChange={({target}) => setEmail(target.value)}
            label="Email address"
            placeholder="arjun@example.com"
            type="email"
          />
          <Input
            value={password} 
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder="Min 6 Characters"
            type="password"
          />
        </div>
        
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        
        <button 
          type="submit" 
          className='btn-primary w-full'
          disabled={isLoading}
        >
          {isLoading ? 'CREATING ACCOUNT...' : 'SIGNUP'}
        </button>
        
        <p className='text-[13px] text-slate-800 mt-3'>
          Already have an account?{" "}
          <button 
            type="button"
            className='font-medium text-primary underline cursor-pointer'
            onClick={() => {
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