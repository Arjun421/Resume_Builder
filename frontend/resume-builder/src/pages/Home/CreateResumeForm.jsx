import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import axiosInstance from "../../utils/axiosInstance";

const CreateResumeForm = ({ onClose, onResumeCreated }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateResume = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter resume title');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      console.log('📝 Creating resume with title:', title);
      const response = await axiosInstance.post('/resume', { title });
      console.log('✅ Resume created:', response.data);
      
      if (response.data.success) {
        // Close modal first
        onClose();
        
        // Refresh the resume list
        if (onResumeCreated) {
          onResumeCreated();
        }
        
        // Navigate to the new resume after a short delay
        setTimeout(() => {
          navigate(`/resume/${response.data.data._id}`);
        }, 100);
      }
    } catch (error) {
      console.error('❌ Error creating resume:', error);
      
      // Handle different error types
      if (error.response) {
        // Server responded with error
        const errorMessage = error.response.data?.message || 'Server error occurred';
        setError(errorMessage);
      } else if (error.request) {
        // Network error
        setError('Network error. Please check your connection.');
      } else {
        // Other error
        setError(error.message || 'Something went wrong. Please try again');
      }
    }
    setLoading(false);
  };

  return (
    <div className='bg-white rounded-2xl p-8 max-w-lg w-full mx-auto relative'>
      {/* Close Button */}
      <button 
        onClick={onClose}
        className='absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl transition-colors'
        type="button"
      >
        <IoClose />
      </button>

      {/* Header */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Create New Resume</h2>
        <p className='text-gray-500'>Give your resume a title to get started. You can edit all details later.</p>
      </div>
      
      <form onSubmit={handleCreateResume} className='space-y-6'>
        {/* Resume Title Input */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Resume Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Eg: Mike's Resume"
            className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-400'
            disabled={loading}
          />
        </div>
        
        {/* Error Message */}
        {error && (
          <p className='text-red-500 text-sm bg-red-50 p-3 rounded-lg'>{error}</p>
        )}
        
        {/* Create Button */}
        <button 
          type="submit" 
          disabled={loading || !title.trim()}
          className='w-full py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          {loading ? 'Creating...' : 'Create Resume'}
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;