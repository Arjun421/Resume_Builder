import React from 'react';
import Input from '../Inputs/Input';
import ProfilePhotoSelector from '../Inputs/ProfilePhotoSelector';

const ProfileInfoCard = ({ profileData, updateSection, onNext }) => {
  return (
    <div className='p-5 pt-5'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>Profile Information</h3>
      
      <div className='space-y-4'>
        {/* Profile Photo */}
        <ProfilePhotoSelector
          image={profileData?.profileImg}
          existingPreviewUrl={profileData?.profilePreviewUrl}
          setImage={(file) => {
            updateSection('profileImg', file);
            if (file) {
              const previewUrl = URL.createObjectURL(file);
              updateSection('profilePreviewUrl', previewUrl);
            } else {
              updateSection('profilePreviewUrl', null);
            }
          }}
        />

        {/* Full Name */}
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={profileData?.fullName || ''}
          onChange={(e) => updateSection('fullName', e.target.value)}
        />

        {/* Designation */}
        <Input
          label="Designation"
          type="text"
          placeholder="Software Developer"
          value={profileData?.designation || ''}
          onChange={(e) => updateSection('designation', e.target.value)}
        />

        {/* Summary */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Professional Summary
          </label>
          <textarea
            placeholder="Brief description about yourself..."
            value={profileData?.summary || ''}
            onChange={(e) => updateSection('summary', e.target.value)}
            rows={4}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none'
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoCard;