import React from 'react'
import Input from '../../../components/Inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'

const SkillsInfoForm = ({skillsInfo, updateArrayItems, addArrayItems, removeArrayItem}) => {
  return (
    <div className='px-5 pt-5'>
      <h2 className='text-lg font-semibold text-gray-900 mb-6'>Skills</h2>
      
      <div className="space-y-4">
        {skillsInfo?.map((skill, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* Skill Name */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Skill Name
              </label>
              <Input
                placeholder="Javascript"
                type="text"
                value={skill.name || ""}
                onChange={({ target }) =>
                  updateArrayItems(index, "name", target.value)
                }
              />
            </div>

            {/* Proficiency */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Proficiency ({Math.round((skill.progress || 0)/20)}/5)
              </label>
              
              {/* Rating Dots */}
              <div className="flex items-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => updateArrayItems(index, "progress", rating * 20)}
                    className={`w-8 h-8 rounded-lg transition-colors cursor-pointer ${
                      Math.round((skill.progress || 0)/20) >= rating
                        ? 'bg-purple-600'
                        : 'bg-purple-200'
                    } hover:bg-purple-500`}
                  />
                ))}
              </div>
              
              {/* Remove button for this skill */}
              {skillsInfo.length > 1 && (
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800 text-xs flex items-center gap-1"
                  onClick={() => removeArrayItem(index)}
                >
                  <LuTrash2 size={12} /> Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Skill Button */}
      <button
        type="button"
        className="mt-6 flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        onClick={() =>
          addArrayItems({
            name: "",
            progress: 0
          })
        }
      >
        <LuPlus size={16} /> Add Skill
      </button>
    </div>
  )
}

export default SkillsInfoForm