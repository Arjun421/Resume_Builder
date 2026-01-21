import React from 'react'
import Input from '../../../components/Inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'

const ProjectsDetailFrom = ({projectInfo, updateArrayItems, addArrayItems, removeArrayItem}) => {
  console.log('🔍 ProjectsDetailFrom props:', { 
    projectInfo, 
    updateArrayItems: typeof updateArrayItems, 
    addArrayItems: typeof addArrayItems, 
    removeArrayItem: typeof removeArrayItem 
  });
  
  return (
    <div className='px-5 pt-5'>
      <h2 className='text-lg font-semibold text-gray-900 mb-6'>Projects</h2>
      
      <div className="space-y-6">
        {projectInfo?.map((project, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Project Title */}
              <div>
                <Input
                  label="Project Title"
                  placeholder="E-commerce Website"
                  type="text"
                  value={project.title || ""}
                  onChange={({ target }) => {
                    console.log('📝 Title change:', target.value, 'index:', index);
                    updateArrayItems(index, "title", target.value);
                  }}
                />
              </div>

              {/* GitHub Link */}
              <div>
                <Input
                  label="GitHub Link"
                  placeholder="https://github.com/username/project"
                  type="text"
                  value={project.github || ""}
                  onChange={({ target }) =>
                    updateArrayItems(index, "github", target.value)
                  }
                />
              </div>
            </div>

            {/* Live Demo */}
            <div className="mb-4">
              <Input
                label="Live Demo URL"
                placeholder="https://project-demo.com"
                type="text"
                value={project.liveDemo || ""}
                onChange={({ target }) =>
                  updateArrayItems(index, "liveDemo", target.value)
                }
              />
            </div>

           
            <div className="mb-4">
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Description
              </label>
              <textarea
                placeholder="Brief description of the project..."
                value={project.description || ""}
                onChange={({ target }) =>
                  updateArrayItems(index, "description", target.value)
                }
                className="form-input min-h-[80px] resize-none"
                rows={3}
              />
            </div>

            {/* Remove button */}
            {projectInfo.length > 1 && (
              <button
                type="button"
                className="text-red-600 hover:text-red-800 text-sm flex items-center gap-2"
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash2 size={14} /> Remove Project
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Add Project Button */}
      <button
        type="button"
        className="mt-6 flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        onClick={() => {
          console.log('➕ Add Project clicked');
          addArrayItems({
            title: "",
            description: "",
            github: "",
            liveDemo: ""
          });
        }}
      >
        <LuPlus size={16} /> Add Project
      </button>
    </div>
  )
}

export default ProjectsDetailFrom