import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { LuUser, LuLogOut, LuChevronDown } from 'react-icons/lu'

const UserProfile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { user, clearUser, isAuthenticated } = useContext(UserContext)
  const navigate = useNavigate()

  if (!isAuthenticated || !user) {
    return null
  }

  const handleLogout = () => {
    clearUser()
    setIsDropdownOpen(false)
    navigate('/')
  }

  const getUserInitials = () => {
    if (!user.name) return 'U'
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 transition-colors"
      >
        {/* Profile Image or Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center">
          {user.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <LuUser className="w-4 h-4 text-purple-600" />
          )}
        </div>
        
        {/* User Name */}
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user.name || 'User'}
        </span>
        
        {/* Dropdown Arrow */}
        <LuChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isDropdownOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center">
                  {user.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-purple-600">
                      {getUserInitials()}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <button
                onClick={() => {
                  setIsDropdownOpen(false)
                  navigate('/dashboard')
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LuUser className="w-4 h-4 mr-3" />
                Dashboard
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LuLogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default UserProfile