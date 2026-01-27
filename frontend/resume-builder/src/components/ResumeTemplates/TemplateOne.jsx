import React, { useRef, useState, useEffect } from "react";
import {
  LuMapPinHouse,
  LuMail,
  LuPhone,
  LuRss,
  LuGithub,
  LuUser,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ContactInfo from "../ResumeSections/ContactInfo";
import EducationInfo from "../ResumeSections/EducationInfo";
import LanguageSection from "../ResumeSections/LanguageSection";
import WorkExperience from "../ResumeSections/WorkExperience";
import ProjectInfo from "../ResumeSections/ProjectInfo";
import SkillSection from "../ResumeSections/SkillSection";
import CertificationInfo from "../ResumeSections/CertificationInfo";
import InterestSection from "../ResumeSections/InterestSection";



const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];


const formatYearMonth = (dateString) => {
  if (!dateString) return '';
  

  if (dateString.includes('-') && dateString.length === 7) {
    const [year, month] = dateString.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  }
  
  return dateString;
};

const Title = ({ text, color }) => {
  return (
    <div className="relative w-fit mb-2">
      <span
        className="absolute bottom-0 left-0 w-full h-1.5"
        style={{ backgroundColor: color }}
      />
      <h2 className="relative text-xs font-semibold">{text}</h2>
    </div>
  );
};

const TemplateOne = ({ resumeData, colorPalette, containerWidth }) => {
  console.log('🎨 TemplateOne received resumeData:', resumeData);
  console.log('📚 Education data:', resumeData?.education);
  console.log('📚 Education length:', resumeData?.education?.length);
  if (resumeData?.education) {
    resumeData.education.forEach((edu, index) => {
      console.log(`📚 Education ${index}:`, edu);
    });
  }
  
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800); // Default value
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Calculate the scale factor based on the container width
    const actualBaseWidth = resumeRef.current?.offsetWidth || 800;
    setBaseWidth(actualBaseWidth); // Get the actual base width
    setScale(containerWidth / actualBaseWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-2 bg-white max-w-full"
      style={{
        transform: containerWidth > 0 ? `scale(${Math.min(scale, 1)})` : "none",
        transformOrigin: "top left",
        width: "100%",
        maxWidth: "800px",
        height: "auto",
      }}
    >
      <div className="grid grid-cols-12 gap-4">
        {/* LEFT COLUMN */}
        <div
          className="col-span-4 py-8"
          style={{ backgroundColor: themeColors[0] }}
        >
          <div className="flex flex-col items-center px-3">
            {/* Profile Image */}
            <div
              className="w-[100px] h-[100px] max-w-[110px] max-h-[110px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: themeColors[1] }}
            >
              {resumeData.profileInfo.profilePreviewUrl ? (
                <img
                  src={resumeData.profileInfo.profilePreviewUrl}
                  className="w-[90px] h-[90px] rounded-full object-cover"
                  alt="profile"
                />
              ) : (
                <div
                  className="w-[90px] h-[90px] rounded-full flex items-center justify-center"
                  style={{ color: themeColors[4] }}
                >
                  <LuUser size={40} />
                </div>
              )}
            </div>

            {/* Name */}
            <h2 className="text-base font-bold mt-4 text-center">
              {resumeData?.profileInfo?.fullName || "No Name Provided"}
            </h2>

            {/* Designation */}
            <p className="text-xs text-center text-gray-600 mt-2">
              {resumeData?.profileInfo?.designation || "No Designation"}
            </p>
          </div>
          
          <div className="my-6 mx-6">
            <div className="flex flex-col gap-4">
              <ContactInfo
                icon={<LuMapPinHouse/>}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.location}
              />
              <ContactInfo
                icon={<LuMail />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.email}
              />
              <ContactInfo
                icon={<LuPhone />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.phone}
              />
              {resumeData.contactInfo.linkedin && (
                <ContactInfo
                  icon={<RiLinkedinLine />}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo.linkedin}
                />
              )}
              {resumeData.contactInfo.github && (
                <ContactInfo
                  icon={<LuGithub />}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo.github}
                />
              )}
              <ContactInfo
                icon={<LuRss />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.website}
              />
            </div>
            <div className="mt-5">
              <Title text="Education" color={themeColors[1]} />
              
              {resumeData.education && resumeData.education.length > 0 ? (
                resumeData.education.filter(data => data.degree || data.institution).length > 0 ? (
                  resumeData.education.map((data, index) => (
                    <EducationInfo
                      key={`education_${index}`}
                      degree={data.degree}
                      institution={data.institution}
                      duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                    />
                  ))
                ) : (
                  <p className="text-xs text-gray-500">No education information available</p>
                )
              ) : (
                <p className="text-xs text-gray-500">No education information available</p>
              )}
            </div>
            
            <div className="mt-5">
              <Title text="Languages" color={themeColors[1]} />
              
              {resumeData.languages && resumeData.languages.length > 0 ? (
                resumeData.languages.filter(lang => lang.name).length > 0 ? (
                  resumeData.languages.map((lang, index) => (
                    <LanguageSection
                      key={`language_${index}`}
                      name={lang.name}
                      proficiency={lang.progress}
                    />
                  ))
                ) : (
                  <p className="text-xs text-gray-500">No language information available</p>
                )
              ) : (
                <p className="text-xs text-gray-500">No language information available</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-span-8 pt-6 mr-3 pb-3">
          <div>
            <Title text="Professional Summary" color={themeColors[1]}/>
            <p className="text-xs font-medium">
              {resumeData.profileInfo.summary}
            </p>

          </div>
          <div className="mt-4">
  <Title text="Work Experience" color={themeColors[1]} />

  {resumeData.workExperience && resumeData.workExperience.map((data, index) => (
    <WorkExperience
      key={`work_${index}`}
      company={data.company}
      role={data.role}
      duration={`${formatYearMonth(data.startDate)} — ${formatYearMonth(data.endDate)}`}
      durationColor={themeColors[4]}
      description={data.description}
    />
  ))}
          </div>
          <div className="mt-4">
            <Title text="Projects" color={themeColors[1]} />

            {resumeData.projects.map((project) => (
              <ProjectInfo
                key={project.title}
                title={project.title}
                description={project.description}
                githubLink={project.github}
                liveDemoUrl={project.liveDemo}
                bgColor={themeColors[2]}
              />
            ))}
          </div>
          <div className="mt-4">
            <Title text="Skills" color={themeColors[1]}/>
            <SkillSection
              skills={resumeData.skills}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
            />
          </div>
          <div className="mt-4">
            <Title text="Certifications" color={themeColors[3]}/>
            <div className="grid grid-cols-2 gap-2">
              {resumeData.certification && resumeData.certification.map((data, index) => (
                <CertificationInfo
                  key={`cert_${index}`}
                  title={data.title}
                  issuer={data.isuser}
                  year={data.year}
                  bgColor={themeColors[2]}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <Title text="Interests" color={themeColors[1]} />
            <InterestSection interests={resumeData.interests} />
          </div>




        </div>
      </div>
    </div>
  );
};

export default TemplateOne;