import { useState, useRef } from 'react'
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, existingPreviewUrl }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(existingPreviewUrl || null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Update the image state
      setImage(file);

      // Generate preview URL from the file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };
  
  const onChooseFile = () => {
    inputRef.current.click()
  }

  return (
    <div className="mb-6 flex justify-center">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="relative">
        {!image && !previewUrl ? (
          <>
            {/* User Avatar Placeholder */}
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <LuUser className="w-12 h-12 text-purple-300" />
            </div>
            
            {/* Upload Button */}
            <button
              type="button"
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
              onClick={onChooseFile}
            >
              <LuUpload className="w-5 h-5 text-white" />
            </button>
          </>
        ) : (
          <>
            {/* Profile Image */}
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src={previewUrl}
                alt="profile photo"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Remove Button */}
            <button
              type="button"
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
              onClick={handleRemoveImage}
            >
              <LuTrash className="w-5 h-5 text-white" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;