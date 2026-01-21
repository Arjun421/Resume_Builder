import React from 'react'
import Input from '../../../components/Inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'

const CertificationInfoForm = ({certificationInfo, updateArrayItems, addArrayItems, removeArrayItem}) => {
  return (
    <div className='px-5 pt-5'>
      <h2 className='text-lg font-semibold text-gray-900 mb-6'>Certifications</h2>
      
      <div className="space-y-6">
        {certificationInfo?.map((cert, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Certification Title */}
              <div>
                <Input
                  label="Certification Title"
                  placeholder="AWS Certified Solutions Architect"
                  type="text"
                  value={cert.title || ""}
                  onChange={({ target }) =>
                    updateArrayItems(index, "title", target.value)
                  }
                />
              </div>

              {/* Issuer */}
              <div>
                <Input
                  label="Issuer"
                  placeholder="Amazon Web Services"
                  type="text"
                  value={cert.issuser || ""}
                  onChange={({ target }) =>
                    updateArrayItems(index, "issuser", target.value)
                  }
                />
              </div>
            </div>

            {/* Year */}
            <div className="mb-4">
              <Input
                label="Year"
                placeholder="2023"
                type="text"
                value={cert.year || ""}
                onChange={({ target }) =>
                  updateArrayItems(index, "year", target.value)
                }
              />
            </div>

            {/* Remove button */}
            {certificationInfo.length > 1 && (
              <button
                type="button"
                className="text-red-600 hover:text-red-800 text-sm flex items-center gap-2"
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash2 size={14} /> Remove Certification
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Add Certification Button */}
      <button
        type="button"
        className="mt-6 flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        onClick={() =>
          addArrayItems({
            title: "",
            issuser: "",
            year: ""
          })
        }
      >
        <LuPlus size={16} /> Add Certification
      </button>
    </div>
  )
}

export default CertificationInfoForm