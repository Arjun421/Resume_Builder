import { useEffect, useState } from "react"
import { getLightColorFromImage } from "../../utils/helper"
const ResumeSummaryCard = ({imageUrl, title, lastUpdated, onSelect}) => {
    const [bgColor,setBgColor]=useState("#ffffff")
    useEffect(()=>{
      if(imageUrl){
        getLightColorFromImage(imageUrl)
        .then((color)=>{
          setBgColor(color)
        }
        )
        .catch((err)=>{
          setBgColor("#ffffff")

        })
      }
    },[imageUrl])
  return (
    <div 
      className="h-[300px] flex flex-col items-center justify-between  bg-white rounded-lg border border-gray-200  hover:border-purple-300 hover:shadow-md cursor-pointer overflow-hidden"
      style={{backgroundColor:bgColor}}
      onClick={onSelect}
    >
      <div className=" p-4">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-[100%] h-[200px] rounded"
          />
        ) : (
          <div></div>
        )}
       
      </div>

      <div className="w-full bg-white px-4 py-3">
         <h5 className="font-medium text-gray-800 text-sm mb-2 trucate overflow-hidden">
          {title || 'Untitled Resume'}
        </h5>
        <p className="text-xs text-gray-500">
          Last updated: {lastUpdated || 'Unknown'}
        </p>
      </div>
    </div>
  )
}

export default ResumeSummaryCard