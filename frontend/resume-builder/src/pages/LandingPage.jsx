import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import UserProfile from '../components/UserProfile'
import { UserContext } from '../context/userContext'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'

const LandingPage = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [currentPage, setCurrentPage] = useState("login")
  const { isAuthenticated } = useContext(UserContext)
  const navigate = useNavigate()

  const handleCTA = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      setOpenAuthModal(true)
    }
  }

  return (
    <div className='w-full min-h-screen bg-white'>
      <div className='container mx-auto px-4 py-6'>

        {/* Header */}
        <header className='flex justify-between items-center mb-16'>
          <div className='text-xl font-bold text-gray-900'>Resume Builder</div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <UserProfile />
            ) : (
              <button
                className='bg-purple-100 text-sm font-semibold text-purple-700 px-7 py-2.5 rounded-lg hover:bg-purple-600 hover:text-white transition-colors cursor-pointer'
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </header>

        {/* Hero */}
        <div className='flex flex-col md:flex-row items-center mb-20'>
          <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
            <span className='inline-block bg-purple-50 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full mb-4'>
              Free Resume Builder
            </span>
            <h1 className='text-5xl font-bold mb-6 leading-tight'>
              Build Your{" "}
              <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,#7182ff_0%,#3cff52_100%)]'>
                Resume Effortlessly
              </span>
            </h1>
            <p className='text-lg text-gray-500 mb-8 leading-relaxed'>
              Craft a professional resume in minutes with our smart and intuitive resume builder. Live preview, beautiful templates, one-click PDF export.
            </p>
            <button
              className='bg-black text-sm font-semibold text-white px-8 py-3.5 rounded-xl hover:bg-purple-600 transition-colors cursor-pointer'
              onClick={handleCTA}
            >
              Get Started — It's Free →
            </button>
          </div>

          {/* Right side illustration placeholder */}
          <div className='w-full md:w-1/2 flex justify-center'>
            <div className='w-full max-w-sm bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100'>
              <div className='bg-white rounded-xl p-4 shadow-sm mb-3'>
                <div className='h-3 bg-purple-200 rounded w-1/2 mb-2'></div>
                <div className='h-2 bg-gray-100 rounded w-3/4 mb-1'></div>
                <div className='h-2 bg-gray-100 rounded w-2/3'></div>
              </div>
              <div className='bg-white rounded-xl p-4 shadow-sm mb-3'>
                <div className='h-2 bg-gray-100 rounded w-full mb-1'></div>
                <div className='h-2 bg-gray-100 rounded w-5/6 mb-1'></div>
                <div className='h-2 bg-gray-100 rounded w-4/6'></div>
              </div>
              <div className='bg-white rounded-xl p-4 shadow-sm'>
                <div className='flex gap-2 mb-2'>
                  <div className='h-2 bg-purple-200 rounded w-1/4'></div>
                  <div className='h-2 bg-blue-200 rounded w-1/4'></div>
                  <div className='h-2 bg-green-200 rounded w-1/4'></div>
                </div>
                <div className='h-2 bg-gray-100 rounded w-3/4'></div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-3 text-gray-900">
            Features That Make You Shine
          </h2>
          <p className="text-center text-gray-400 text-sm mb-10">Everything you need to land your dream job</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className='bg-gray-50 p-6 rounded-xl hover:shadow-md hover:bg-purple-50 transition-all border border-transparent hover:border-purple-100'>
              <div className='text-2xl mb-3'>✏️</div>
              <h3 className='text-base font-semibold mb-2 text-gray-900'>Easy Editing</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Update your resume section by section with live preview and instant formatting.
              </p>
            </div>
            <div className='bg-gray-50 p-6 rounded-xl hover:shadow-md hover:bg-purple-50 transition-all border border-transparent hover:border-purple-100'>
              <div className='text-2xl mb-3'>🎨</div>
              <h3 className='text-base font-semibold mb-2 text-gray-900'>Beautiful Templates</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Choose from modern, professional templates with multiple color palettes to customize.
              </p>
            </div>
            <div className='bg-gray-50 p-6 rounded-xl hover:shadow-md hover:bg-purple-50 transition-all border border-transparent hover:border-purple-100'>
              <div className='text-2xl mb-3'>📄</div>
              <h3 className='text-base font-semibold mb-2 text-gray-900'>One-Click Export</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Download your resume instantly as a high-quality PDF with one click.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <div className='text-sm bg-gray-50 text-gray-400 text-center p-5'>
        Made with ❤️ — Happy Coding!
      </div>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => { setOpenAuthModal(false); setCurrentPage("login") }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </div>
  )
}

export default LandingPage
