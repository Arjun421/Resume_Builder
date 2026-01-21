import React from 'react'
import Input from '../../../components/Inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'
const EducationDetailsForm = ({educationInfo,updateArrayItems,addArrayItems,removeArrayItem}) => {
  return (
  <div className="px-5 pt-5">
    <h2 className="text-lg font-semibold text-gray-900">Education</h2>

    <div className="mt-4 flex flex-col gap-4 mb-3">
      {educationInfo.map((education, index) => (
        <div
          key={index}
          className="border border-gray-200/80 p-4 rounded-lg relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input
              label="Degree"
              placeholder="B.Tech in Computer Science"
              type="text"
              value={education.degree || ""}
              onChange={({ target }) =>
                updateArrayItems(index, "degree", target.value)
              }
            />
            <Input
              label="Institution"
              placeholder="XYZ Institution"
              type="text"
              value={education.institution || ""}
              onChange={({ target }) =>
                updateArrayItems(index, "institution", target.value)
              }
            />
            <Input
              label="Start Date"
              type="month"
              value={education.startDate || ""}
              onChange={({ target }) =>
                updateArrayItems(index, "startDate", target.value)
              }
            />
            <Input
              label="End Date"
              type="month"
              value={education.endDate || ""}
              onChange={({ target }) =>
                updateArrayItems(index, "endDate", target.value)
              }
            />
          </div>
          {educationInfo.length > 1 && (
            <button
              type="button"
              className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
              onClick={() => removeArrayItem(index)}
            >
              <LuTrash2 />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
        onClick={() =>
          addArrayItems({
            degree: "",
            institution: "",
            startDate: "",
            endDate: "",
          })
        }
      >
        <LuPlus /> Add Education
      </button>

    </div>
  </div>
)
}

export default EducationDetailsForm