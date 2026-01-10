import { useState } from 'react'
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa6'

const Input = ({value,onChange,label,placeholder,type}) => {
  const [showPassword, setShowPassword] = useState(false)
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-input pr-10"
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input
