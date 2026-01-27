import React from "react";

const SkillInfo = ({ skill, progress, accentColor }) => {
  // Convert progress from 0-100 scale to 1-5 scale
  const skillLevel = Math.round((progress || 0) / 20);
  
  // Create dots for skill level (1-5)
  const renderSkillDots = () => {
    const dots = [];
    for (let i = 1; i <= 5; i++) {
      dots.push(
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${
            i <= skillLevel ? 'bg-cyan-400' : 'bg-gray-300'
          }`}
        />
      );
    }
    return dots;
  };

  return (
    <div className="flex items-center justify-between mb-2">
      <p className="text-xs font-medium text-gray-900 flex-1">{skill}</p>
      
      <div className="flex items-center gap-1">
        {renderSkillDots()}
      </div>
    </div>
  );
};

const SkillSection = ({ skills, accentColor, bgColor }) => {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-1 mb-5">
      {skills?.map((skill, index) => (
        <SkillInfo
          key={`skill_${index}`}
          skill={skill.name}
          progress={skill.progress}
          accentColor={accentColor}
        />
      ))}
    </div>
  );
};

export default SkillSection;