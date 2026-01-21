import React from 'react'
import Input from '../../../components/Inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'

const AdditionalInfoForm = ({languageInfo, interestsInfo, updateArrayItems, addArrayItems, removeArrayItem, updateSection}) => {
  return (
    <div className='px-5 pt-5'>
      <h2 className='text-lg font-semibold text-gray-900 mb-6'>Additional Information</h2>
      
      {/* Languages Section */}
      <div className="mb-8">
        <h3 className='text-md font-medium text-gray-800 mb-4'>Languages</h3>
        <div className="space-y-4">
          {languageInfo?.map((language, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start border border-gray-200 rounded-lg p-4">
              {/* Language Name */}
              <div>
                <Input
                  label="Language"
                  placeholder="English"
                  type="text"
                  value={language.name || ""}
                  onChange={({ target }) =>
                    updateArrayItems("language", index, "name", target.value)
                  }
                />
              </div>

              {/* Proficiency */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Proficiency ({Math.round((language.progress || 0)/20)}/5)
                </label>
                
                {/* Rating Dots */}
                <div className="flex items-center gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => updateArrayItems("language", index, "progress", rating * 20)}
                      className={`w-8 h-8 rounded-lg transition-colors cursor-pointer ${
                        Math.round((language.progress || 0)/20) >= rating
                          ? 'bg-purple-600'
                          : 'bg-purple-200'
                      } hover:bg-purple-500`}
                    />
                  ))}
                </div>
                
                {/* Remove button for this language */}
                {languageInfo.length > 1 && (
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800 text-xs flex items-center gap-1"
                    onClick={() => removeArrayItem("language", index)}
                  >
                    <LuTrash2 size={12} /> Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Add Language Button */}
        <button
          type="button"
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          onClick={() =>
            addArrayItems("language", {
              name: "",
              progress: 0
            })
          }
        >
          <LuPlus size={16} /> Add Language
        </button>
      </div>

      {/* Interests Section */}
      <div>
        <h3 className='text-md font-medium text-gray-800 mb-4'>Interests</h3>
        <div className="space-y-3">
          {interestsInfo?.map((interest, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Photography, Travel, Reading..."
                  type="text"
                  value={interest || ""}
                  onChange={({ target }) =>
                    updateArrayItems("interests", index, null, target.value)
                  }
                />
              </div>
              
              {/* Remove button */}
              {interestsInfo.length > 1 && (
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800 p-2"
                  onClick={() => removeArrayItem("interests", index)}
                >
                  <LuTrash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
        
        {/* Add Interest Button */}
        <button
          type="button"
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          onClick={() =>
            addArrayItems("interests", "")
          }
        >
          <LuPlus size={16} /> Add Interest
        </button>
      </div>
    </div>
  )
}

export default AdditionalInfoForm