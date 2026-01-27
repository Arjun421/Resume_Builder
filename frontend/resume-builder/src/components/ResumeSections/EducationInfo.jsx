import React from "react";

const EducationInfo = ({ degree, institution, duration }) => {
  console.log('🎓 EducationInfo props:', { degree, institution, duration });
  
 
  if (!degree && !institution && !duration) {
    return null;
  }
  
  return (
    <div className="mb-4">
     
      {degree && (
        <h3 className="text-xs font-semibold text-gray-900 mb-1">
          {degree}
        </h3>
      )}
      

      {institution && (
        <p className="text-xs text-gray-700 mb-1">
          {institution}
        </p>
      )}
      
      {/* Duration */}
      {duration && (
        <p className="text-xs text-gray-500 italic">
          {duration}
        </p>
      )}
    </div>
  );
};

export default EducationInfo;