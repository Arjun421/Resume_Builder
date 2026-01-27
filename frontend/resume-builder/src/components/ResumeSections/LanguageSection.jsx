import React from "react";

const LanguageSection = ({ name, proficiency }) => {
  console.log('🌐 LanguageSection props:', { name, proficiency });
  
  // Don't render if no name
  if (!name) {
    return null;
  }
  
  // Convert proficiency from 0-100 scale to 1-5 scale
  const proficiencyLevel = Math.round((proficiency || 0) / 20);
  
  // Create dots for proficiency level (1-5)
  const renderProficiencyDots = () => {
    const dots = [];
    for (let i = 1; i <= 5; i++) {
      dots.push(
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${
            i <= proficiencyLevel ? 'bg-cyan-400' : 'bg-gray-300'
          }`}
        />
      );
    }
    return dots;
  };
  
  return (
    <div className="flex items-center justify-between mb-3">
      {/* Language Name */}
      <h4 className="text-xs font-medium text-gray-700 flex-1">
        {name}
      </h4>
      
      {/* Proficiency Dots */}
      <div className="flex items-center gap-1">
        {renderProficiencyDots()}
      </div>
    </div>
  );
};

export default LanguageSection;